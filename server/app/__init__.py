from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from groq import Groq

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Load environment variables and create Groq client
    load_dotenv()
    groq_api_key = os.getenv("GROQ_API_KEY")
    groq_client = Groq(api_key=groq_api_key)
    app.config['groq_client'] = groq_client

    # Initialize extensions
    from .extensions import limiter
    limiter.init_app(app)

    # Register blueprints
    from .chat_routes import chat_bp
    from .hospital_routes import hospital_bp
    app.register_blueprint(chat_bp)
    app.register_blueprint(hospital_bp)
    @app.route("/")
    def home():
        return "MindForge API is live 🚀"

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
