from flask import Flask
from .routes import pdf_routes

def create_app():
    app = Flask(__name__)
    app.config['UPLOAD_FOLDER'] = 'temp'  # Directory for uploaded PDFs
    app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB


    # Register all route handlers
    app.register_blueprint(pdf_routes)

    return app
