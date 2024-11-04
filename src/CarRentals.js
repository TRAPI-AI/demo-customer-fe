// Integrating the travel API with the frontend code

import React, { useState, useEffect } from 'react';

const CarRentals = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/indie-campers-list-locations');
        const data = await response.json();
        setLocations(data.data);
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
          <input className="origin" placeholder='Origin' list="locations" />
          <input className="destination" placeholder='Destination' list="locations" />
          <button>Search</button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {locations.map((location) => (
            <li key={location.identifier} className="offer-item">
              {location.name}, {location.address}, {location.country_code}
            </li>
          ))}
        </ul>
      )}
      <datalist id="locations">
        {locations.map((location) => (
          <option key={location.identifier} value={location.name} />
        ))}
      </datalist>
    </div>
  );
};

export default CarRentals;

// End of integration
