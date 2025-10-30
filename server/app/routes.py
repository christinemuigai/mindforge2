from flask import Blueprint, jsonify, request, current_app
import requests
import base64

bp = Blueprint('api', __name__)

@bp.route('/api/hello')
def hello():
    return jsonify(message="Hello from Flask + Groq connected Alex!")

@bp.route('/api/chat', methods=['POST'])
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

@bp.route('/api/chat-with-image', methods=['POST'])
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

@bp.route('/api/maps-key', methods=['GET'])
def maps_key():
    api_key = current_app.config.get('google_maps_api_key')
    if not api_key:
        return jsonify({"error": "Google Maps API key not configured"}), 500
    return jsonify({"apiKey": api_key})

@bp.route('/api/nearby-hospitals', methods=['POST'])
def nearby_hospitals():
    data = request.get_json() or {}
    lat = data.get('lat')
    lng = data.get('lng')

    if not lat or not lng:
        return jsonify({"error": "Latitude and longitude are required"}), 400

    api_key = current_app.config.get('google_maps_api_key')
    if not api_key:
        return jsonify({"error": "Google Maps API key not configured"}), 500

    url = (
        "https://places.googleapis.com/v1/places:searchNearby"
    )

    payload = {
        "includedTypes": ["hospital"],
        "maxResultCount": 10,
        "locationRestriction": {
            "circle": {
                "center": {"latitude": lat, "longitude": lng},
                "radius": 5000.0
            }
        },
        "rankPreference": "DISTANCE"
    }

    headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': api_key,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.id,places.location'
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500