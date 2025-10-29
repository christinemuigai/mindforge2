import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

export default function Locator() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/maps-key")
      .then((res) => res.json())
      .then((data) => {
        if (data.apiKey) setApiKey(data.apiKey);
        else setError("Could not fetch Google Maps API key.");
      })
      .catch(() => setError("Could not fetch Google Maps API key."));
  }, []);

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

  const handleGetDirections = () => {
    if (!selectedHospital || !userLocation) return;

    const origin = `${userLocation.lat},${userLocation.lng}`;
    const destination = `${selectedHospital.location.latitude},${selectedHospital.location.longitude}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;

    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  if (!apiKey) {
    return (
      <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
        <h2>Hospital Locator</h2>
        <p>{error || "Loading Map..."}</p>
      </div>
    );
  }
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

      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || { lat: 34.0522, lng: -118.2437 }} // Default to LA
          zoom={userLocation ? 13 : 8}
        >
          {userLocation && (
            <Marker position={userLocation} title="Your Location" />
          )}
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              position={{
                lat: hospital.location.latitude,
                lng: hospital.location.longitude,
              }}
              onClick={() => setSelectedHospital(hospital)}
            />
          ))}

          {selectedHospital && (
            <InfoWindow
              position={{
                lat: selectedHospital.location.latitude,
                lng: selectedHospital.location.longitude,
              }}
              onCloseClick={() => setSelectedHospital(null)}
            >
              <div>
                <strong>{selectedHospital.displayName.text}</strong>
                <p>{selectedHospital.formattedAddress}</p>
                <button
                  onClick={handleGetDirections}
                  style={{ marginTop: "8px" }}
                  disabled={!userLocation}
                  title={
                    !userLocation
                      ? "Cannot get directions without your location"
                      : "Get directions"
                  }
                >
                  Get Directions
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

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
                }}
                onClick={() => {
                  const newCenter = {
                    lat: hospital.location.latitude,
                    lng: hospital.location.longitude,
                  };
                  setSelectedHospital(hospital);
                  // Optional: Pan map to the hospital when its list item is clicked
                  // setUserLocation(newCenter);
                }}
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
