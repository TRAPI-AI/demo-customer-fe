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
          <input className="origin" placeholder='Origin' list="location-options" />
          <input className="destination" placeholder='Destination' list="location-options" />
          <input className="from" placeholder='From' list="location-options" />
          <input className="to" placeholder='To' list="location-options" />
          <button>Search</button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {locations.map((location, index) => (
            <li key={index} className="search-response-item">
              <p className="status">{location.name}</p>
              <p className="capacity">{location.address}</p>
              <p className="beds">{location.identifier}</p>
              <p className="price-per-day">{location.country_code}</p>
              <p className="total-price">
                Total Price <span className="currency">Currency</span>
              </p>
            </li>
          ))}
        </ul>
      )}
      <datalist id="location-options">
        {locations.map((location, index) => (
          <option key={index} value={location.name} />
        ))}
      </datalist>
    </div>
  );
};

export default CarRentals;

// End of integration
