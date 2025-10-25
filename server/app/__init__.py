from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from groq import Groq

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Load environment variables
    load_dotenv()
    api_key = os.getenv("GROQ_API_KEY")
    client = Groq(api_key=api_key)

    @app.route('/api/hello')
    def hello():
        return jsonify(message="Hello from Flask + Groq connected!")

    @app.route('/api/chat', methods=['POST'])
    def chat():
        """Handle messages from the frontend and generate a Groq response."""
        data = request.get_json()
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": "You are MamaCare AI, a friendly maternal and child health assistant."},
                    {"role": "user", "content": user_message}
                ],
            )

            ai_message = response.choices[0].message.content
            return jsonify({"reply": ai_message})

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
