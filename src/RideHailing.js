import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const RideHailing = () => {
  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input />
          <input />
          <input />
          <button>Search</button>
        </div>
      </div>
      {/* Response items go in this container */}
      <ul>
        <li className="offer-item">Result 1</li>
        <li className="offer-item">Result 2</li>
        <li className="offer-item">Result 3</li>
        <li className="offer-item">Result 4</li>
        <li className="offer-item">Result 5</li>
      </ul>
      {/* <MapContainer
        center={[52, 0]}
        zoom={2}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          key={}
          position={[]}
        >
          <Popup></Popup>
        </Marker>
      </MapContainer> */}
    </div>
  );
};

export default RideHailing;
