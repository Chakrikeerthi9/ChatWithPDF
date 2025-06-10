from flask import Flask
from .routes import pdf_routes
from flask_cors import CORS
from .utils.config import get_config

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/upload": {"origins": "http://localhost:3000"}}, supports_credentials=True)
    app.config.from_object(get_config())
    app.register_blueprint(pdf_routes)

    return app
