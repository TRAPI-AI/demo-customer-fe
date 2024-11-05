// Import necessary components and styles
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Define the DriverLocations component
const DriverLocations = () => {
  // State to store locations data and loading status
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch locations from the backend
  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/indie-campers-list-locations");
        const data = await response.json();
        setLocations(data.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div>
      <div>
        <div className="location-search">
          {/* Input fields for origin and destination */}
          <input placeholder="Origin" />
          <input placeholder="Destination" />
          <button>Search</button>
        </div>
      </div>
      {/* Display loading indicator if data is being fetched */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {/* Map through locations and display each one */}
          {locations.map((location, index) => (
            <li key={index} className="location-item">
              {location.name}, {location.address}, {location.country_code}
            </li>
          ))}
        </ul>
      )}
      <MapContainer
        center={[52, 0]}
        zoom={2}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Display markers for each location */}
        {locations.map((location, index) => (
          <Marker key={index} position={[52, 0]}>
            <Popup>
              {location.name}<br />
              {location.address}<br />
              {location.country_code}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DriverLocations;
// End of component
