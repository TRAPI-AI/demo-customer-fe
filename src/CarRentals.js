// Import necessary React hooks
import React, { useState } from 'react';

const CarRentals = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/indie-campers-list-locations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data.data); // Set responseData to the 'data' array from the response
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
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
          {responseData.map((item, index) => (
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
// End of the CarRentals component
