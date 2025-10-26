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

    google_maps_api_key = os.getenv("GOOGLE_MAPS_API_KEY")
    app.config['google_maps_api_key'] = google_maps_api_key

    # Register routes blueprint
    from .routes import bp as routes_bp
    app.register_blueprint(routes_bp)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
