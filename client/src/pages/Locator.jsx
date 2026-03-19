import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Fix for default marker icon in leaflet with webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function Routing({ source, destination }) {
  const map = useMap();

  React.useEffect(() => {
    if (!map || !source || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(source.lat, source.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      lineOptions: {
        styles: [{ color: "#007bff", weight: 4 }],
      },
      createMarker: () => null, // Hide default routing markers as we already have ours
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, source, destination]);

  return null;
}

export default function Locator() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const findHospitals = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    const success = async (position) => {
      try {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userCoords);

        const response = await fetch(
          "http://127.0.0.1:5000/api/nearby-hospitals",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lat: userCoords.lat,
              lng: userCoords.lng,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setHospitals(data.places || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const error = (err) => {
      setError(`Could not get location: ${err.message}`);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const mapContainerStyle = {
    height: "400px",
    width: "100%",
    marginTop: "1rem",
    borderRadius: "8px",
  };

  const handleGetDirections = (hospital) => {
    if (!userLocation || !hospital) return;

    const origin = `${userLocation.lat},${userLocation.lng}`;
    const destination = `${hospital.location.latitude},${hospital.location.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Hospital Locator</h2>
      <button
        onClick={findHospitals}
        disabled={loading}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          marginBottom: "1rem",
        }}
      >
        {loading ? "Finding Hospitals..." : "Find Nearby Hospitals"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {userLocation && (
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={13}
          style={mapContainerStyle}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>You are here</Popup>
          </Marker>

          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              position={[hospital.location.latitude, hospital.location.longitude]}
              eventHandlers={{
                click: () => setSelectedHospital(hospital),
              }}
            >
              <Popup>
                <div>
                  <strong>{hospital.displayName.text}</strong>
                  <p>{hospital.formattedAddress}</p>
                  <button
                    onClick={() => handleGetDirections(hospital)}
                    style={{ marginTop: "8px" }}
                  >
                    Open in Google Maps
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {selectedHospital && (
            <Routing 
              source={userLocation} 
              destination={{ 
                lat: selectedHospital.location.latitude, 
                lng: selectedHospital.location.longitude 
              }} 
            />
          )}
        </MapContainer>
      )}

      {hospitals.length > 0 && (
        <div>
          <h3 style={{ marginTop: "2rem" }}>Nearby Hospitals:</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {hospitals.map((hospital) => (
              <li
                key={hospital.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  cursor: "pointer",
                  backgroundColor: selectedHospital?.id === hospital.id ? '#f0f8ff' : 'white'
                }}
                onClick={() => setSelectedHospital(hospital)}
              >
                <strong>{hospital.displayName.text}</strong>
                <p>{hospital.formattedAddress}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
