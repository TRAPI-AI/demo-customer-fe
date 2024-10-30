// Start of integration code

import React, { useState } from 'react';

const CarRentals = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/indie-campers-list-locations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setLocations(data.map(location => location.Name));
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input onClick={fetchLocations} placeholder="Origin" />
          <input onClick={fetchLocations} placeholder="Destination" />
          <input placeholder="Date" />
          <button>Search</button>
        </div>
      </div>
      {/* Response items go in this container */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {locations.map((location, index) => (
            <li key={index} className="offer-item">{location}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarRentals;

// End of integration code
