import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from .utils.pdf_utils import extract_text_from_pdf

pdf_routes = Blueprint("pdf_routes", __name__)
@pdf_routes.route("/")
def home():
    return "Hello World"

@pdf_routes.route("/upload", methods=["POST"])
def upload_pdf():
    # Ensure a file is sent
    if "pdf" not in request.files:
        return jsonify({"error": "No PDF uploaded"}), 400

    file = request.files["pdf"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    # Save file securely in temp folder
    filename = secure_filename(file.filename)
    filepath = os.path.join("temp", filename)
    file.save(filepath)

    # Extract text using PyMuPDF
    extracted_text = extract_text_from_pdf(filepath)

    # Return text as JSON response
    return jsonify({"text": extracted_text})
