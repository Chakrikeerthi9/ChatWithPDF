from flask import Flask
from flask_cors import CORS
from flask import request, jsonify
from app.langchain.app_langchain import get_app_langchain
import tempfile
import requests

app = Flask(__name__)

CORS(app)

app.config['UPLOAD_FOLDER'] = 'temp'
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
        print(data)

        fileUrl = data.get("fileUrl")
        response = requests.get(fileUrl)
        response.raise_for_status()

        # save file to temp folder
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(response.content)
            file_path = tmp.name

        # get app langchain
        app_langchain = get_app_langchain(file_path)

        # return message
        return jsonify({'message': 'PDF loaded and conversation chain initialized'})
    except Exception as e:
        return jsonify({'message': 'File uploaded failed', 'error': str(e)}), 500
    

@app.route("/ask", methods=["POST"])
def ask():
    try:
        global app_langchain
        data = request.get_json(force=True)
        question = data.get("question")

        if not app_langchain:
            return jsonify({'message': 'PDF not loaded yet'}), 400

        result = app_langchain.invoke({'question': question})
        return jsonify({'message': 'Question answered', 'answer': result['answer']})
    except Exception as e:
        return jsonify({'message': 'Question failed', 'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)  # Launches Flask server on http://localhost:5000
