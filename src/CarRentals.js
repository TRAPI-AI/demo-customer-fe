import React, { useState } from 'react';

const CarRentals = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/indie-campers-list-locations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setResponse(data.data); // Update to access the 'data' array in the response
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input />
          <input />
          <input />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {response.map((item, index) => (
            <li key={index} className="offer-item">
              <div>
                <strong>Name:</strong> {item.name}
              </div>
              <div>
                <strong>Address:</strong> {item.address}
              </div>
              <div>
                <strong>Identifier:</strong> {item.identifier}
              </div>
              <div>
                <strong>Country Code:</strong> {item.country_code}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarRentals;
