from flask import Blueprint, jsonify, request, current_app
import base64
from .extensions import limiter

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/api/chat', methods=['POST'])
@limiter.limit("10 per minute")
def chat():
    if 'message' not in request.form:
        return jsonify({"error": "No message part"}), 400

    user_message = request.form['message']

    client = current_app.config.get('groq_client')
    if client is None:
        return jsonify({"error": "Groq client not configured"}), 500

    try:
        response = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {"role": "system", "content": "You are MamaCare AI, a friendly and specialized maternal and child health assistant. Your sole purpose is to answer questions and provide guidance strictly related to maternal health, pregnancy, childbirth, and child health. Politely decline to answer any questions that fall outside of this scope, explaining that your expertise is limited to maternal and child health topics."},
                {"role": "user", "content": user_message}
            ],
        )
        ai_message = response.choices[0].message.content
        return jsonify({"reply": ai_message})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@chat_bp.route('/api/chat-with-image', methods=['POST'])
@limiter.limit("10 per minute")
def chat_with_image():
    user_message = request.form.get("message", "")
    image_file = request.files.get('image')

    # Check for empty input
    if not user_message and not image_file:
        return jsonify({"error": "No message or image provided"}), 400

    # Get Groq client from app config
    client = current_app.config.get('groq_client')
    if not client:
        return jsonify({"error": "Groq client not configured"}), 500

    # Build message structure
    content = []
    if user_message:
        content.append({"type": "text", "text": user_message})

    if image_file:
        # Validate it's actually an image
        if not image_file.content_type.startswith("image/"):
            return jsonify({"error": "File is not an image"}), 400

        # Convert the uploaded image to base64
        base64_image = base64.b64encode(image_file.read()).decode("utf-8")

        # Append image data in the Groq-supported format
        content.append({
            "type": "image_url",
            "image_url": {
                "url": f"data:{image_file.content_type};base64,{base64_image}"
            }
        })

    # Final messages payload
    messages = [
        {"role": "system", "content": "You are MamaCare AI, a friendly and specialized maternal and child health assistant. Your sole purpose is to answer questions and provide guidance strictly related to maternal health, pregnancy, childbirth, and child health. Politely decline to answer any questions that fall outside of this scope, explaining that your expertise is limited to maternal and child health topics."},
        {"role": "user", "content": content}
    ]

    try:
        # Use Groq’s multimodal Llama 4 model
        chat_completion = client.chat.completions.create(
            messages=messages,
            model="meta-llama/llama-4-scout-17b-16e-instruct",
        )

        ai_message = chat_completion.choices[0].message.content
        return jsonify({"reply": ai_message})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
