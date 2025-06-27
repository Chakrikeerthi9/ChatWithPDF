from flask import Flask
from flask_cors import CORS
from flask import request, jsonify
from app.langchain.app_langchain import get_app_langchain
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from limits.storage import RedisStorage
from dotenv import load_dotenv
from flask_limiter.errors import RateLimitExceeded
from app.db.user_queries import get_or_create_user
from app.db.queries import insert_upload, insert_chat_log, fetch_uploads_for_user, fetch_chat_logs_for_upload
import tempfile
import requests
import redis
import os

load_dotenv()

app = Flask(__name__)

CORS(app)

# redis Config
r = redis.Redis(
    host='redis-10782.c17.us-east-1-4.ec2.redns.redis-cloud.com',
    port=10782,
    decode_responses=True,
    username="default",
    password=os.getenv("R_PASSWORD"),
)
redis_storage = os.getenv("R_LINK")

# Attach Redis to Flask-Limiter
limiter = Limiter(
    app = app,
    storage_uri=redis_storage,
    key_func=lambda: request.headers.get("clerk-user-id") or get_remote_address(),
)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB



# global variable for app langchain
app_langchain = None

@app.route("/upload", methods=["POST", "OPTIONS"])
def upload_pdf():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight passed"})
    try:
        global app_langchain
        data = request.get_json(force=True)

        fileUrl = data.get("fileUrl")
        clerk_user_id = data.get("clerk_user_id")
        email = data.get("email")
        name = data.get("name")

        if not fileUrl or not clerk_user_id:
            return jsonify({"message": "Missing fileUrl or user info"}), 400

        response = requests.get(fileUrl)
        response.raise_for_status()

        # save file to temp folder
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(response.content)
            file_path = tmp.name
            filename = tmp.name.split(os.sep)[-1]

        # create user and insert pdf upload record
        user_id = get_or_create_user(clerk_user_id, email, name)
        upload_id = insert_upload(user_id, filename)

        # get app langchain
        app_langchain = get_app_langchain(file_path)

        # return message
        return jsonify({
                    'message': 'PDF loaded and conversation chain initialized',
                    'upload_id': upload_id
                })
    except Exception as e:
        return jsonify({'message': 'File uploaded failed', 'error': str(e)}), 500
    

@app.route("/ask", methods=["POST"])
@limiter.limit("5 per hour")
def ask():
    try:
        global app_langchain
        data = request.get_json(force=True)
        question = data.get("question")
        upload_id = data.get("upload_id")
        print(upload_id, "upload_id")
        if not app_langchain:
            return jsonify({'message': 'PDF not loaded yet'}), 400

        result = app_langchain.invoke({'question': question})
        answer = result['answer']
  
        # store in chat_log table
        insert_chat_log(upload_id, question, answer)
        print("4")
        return jsonify({'message': 'Question answered', 'answer': answer})
    except Exception as e:
        return jsonify({'message': 'Question failed', 'error': str(e)}), 500




@app.route("/history", methods=["POST"])
def history():
    try:
        data = request.get_json(force=True)
        clerk_user_id = data.get("clerk_user_id")
        email = data.get("email")
        name = data.get("name")
        if not clerk_user_id:
            return jsonify({"message": "clerk_user_id is required"}), 400

        # get user id
        user_id = get_or_create_user(clerk_user_id, email, name)  # returns existing user or creates new

        uploads = fetch_uploads_for_user(user_id)
        return jsonify({"uploads": uploads}), 200

    except Exception as e:
        return jsonify({"message": "Failed to fetch uploads", "error": str(e)}), 500


@app.route("/chatlog", methods=["POST"])
def chatlog():
    try:
        data = request.get_json(force=True)
        upload_id = data.get("upload_id")
        if not upload_id:
            return jsonify({"message": "upload_id is required"}), 400

        chatlog = fetch_chat_logs_for_upload(upload_id)
        return jsonify({"chatlog": chatlog}), 200

    except Exception as e:
        return jsonify({"message": "Failed to fetch chat logs", "error": str(e)}), 500


@app.errorhandler(RateLimitExceeded)
def rate_limit_handler(e):
    return jsonify({
        "error": "Rate limit exceeded",
        "message": str(e.description),
        "retry_after": e.retry_after
    }), 429


if __name__ == "__main__":
    app.run(debug=True)  # Launches Flask server on http://localhost:5000
