import requests
from io import BytesIO
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from .utils.pdf_utils import extract_text_from_pdf



pdf_routes = Blueprint("pdf_routes", __name__)
@pdf_routes.route("/")
def home():
    return "Hello World"

@pdf_routes.route("/upload", methods=["POST", "OPTIONS"])
def upload_pdf():
    if request.method == "OPTIONS":
        # Preflight request
        response = jsonify({"message": "CORS preflight passed"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response, 200

    # Normal POST request
    data = request.json
    fileUrl = data.get("fileUrl")
    print(fileUrl)

    response = requests.get(fileUrl)
    pdf_file = BytesIO(response.content)
    extracted_text = extract_text_from_pdf(pdf_file)

    return jsonify({"text": extracted_text})

