import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DriverLocations = () => {
  return (
    <div>
      <div>
        <div className="location-search">
          {/* Input fields go in this container */}
          <input />
          <input />
          <button>Search</button>
        </div>
      </div>
      {/* Response items go in this container */}
      <ul>
        <li className="location-item"></li>
        <li className="location-item"></li>
      </ul>
      <MapContainer
        center={[52, 0]}
        zoom={2}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[52, 0]}>
          <Popup></Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DriverLocations;
