// Integrating the frontend with the backend for Indie Campers location data

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarRentals = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/indie-campers-list-locations');
        setLocations(response.data.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input className="origin" placeholder="Origin" list="origin-list" />
          <datalist id="origin-list">
            {locations.map((location) => (
              <option key={location.identifier} value={location.name} />
            ))}
          </datalist>
          <input className="destination" placeholder="Destination" list="destination-list" />
          <datalist id="destination-list">
            {locations.map((location) => (
              <option key={location.identifier} value={location.name} />
            ))}
          </datalist>
          <input className="date-from" type="date" />
          <input className="date-to" type="date" />
          <button>Search</button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          <li className="search-response-item">
            <img alt="Placeholder Image" className="vehicle-image" />
            <div>
              <p className="status">status</p>
              <p className="capacity">capacity</p>
              <p className="beds">beds</p>
              <p className="price-per-day">price-per-day</p>
              <p className="total-price">
                total price<span className="currency">currency</span>
              </p>
            </div>
            <button className="select-button">Select</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CarRentals;

// End of integration
