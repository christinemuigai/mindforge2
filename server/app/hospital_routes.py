from flask import Blueprint, jsonify, request
import requests
from .extensions import limiter

hospital_bp = Blueprint('hospitals', __name__)

@hospital_bp.route('/api/nearby-hospitals', methods=['POST'])
@limiter.limit("5 per minute")
def nearby_hospitals():
    data = request.get_json() or {}
    lat = data.get('lat')
    lng = data.get('lng')

    if not lat or not lng:
        return jsonify({"error": "Latitude and longitude are required"}), 400

    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_query = f"""
    [out:json];
    (
      node["amenity"="hospital"](around:5000,{lat},{lng});
      way["amenity"="hospital"](around:5000,{lat},{lng});
    );
    out center;
    """

    try:
        response = requests.post(overpass_url, data={'data': overpass_query})
        response.raise_for_status()
        data = response.json()

        places = []
        for element in data.get("elements", []):
            # For ways, Overpass provides 'center' coords if 'out center' is used
            element_lat = element.get('lat') or element.get('center', {}).get('lat')
            element_lon = element.get('lon') or element.get('center', {}).get('lon')
            
            tags = element.get("tags", {})
            name = tags.get("name", "Unknown Hospital")
            address = tags.get("addr:street", "")
            if "addr:city" in tags:
                address += f", {tags['addr:city']}" if address else tags['addr:city']
                
            places.append({
                "displayName": {"text": name},
                "formattedAddress": address.strip(", "),
                "id": str(element.get("id", "")),
                "location": {
                    "latitude": element_lat,
                    "longitude": element_lon
                }
            })

        return jsonify({"places": places})
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
