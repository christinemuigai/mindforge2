from flask import Blueprint, jsonify, request, current_app
import requests

bp = Blueprint('api', __name__)

@bp.route('/api/hello')
def hello():
    return jsonify(message="Hello from Flask + Groq connected Alex!")

@bp.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    client = current_app.config.get('groq_client')
    if client is None:
        return jsonify({"error": "Groq client not configured"}), 500

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