import React, { useState } from 'react';

const CarRentals = () => {
  const [origin, setOrigin] = useState('');
  const [originOptions, setOriginOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOriginClick = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/indie-campers-list-locations', {
        method: 'GET',
      });
      const data = await response.json();
      // Assuming the response structure is { "data": [ { "name": "str*" } ], "message": "str*" }
      setOriginOptions(data.data || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOriginSelect = (event) => {
    setOrigin(event.target.value);
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input
            type="text"
            placeholder="Origin"
            onClick={handleOriginClick}
            value={origin}
            readOnly
          />
          {loading && <div>Loading...</div>}
          {originOptions.length > 0 && (
            <select onChange={handleOriginSelect}>
              <option value="">Select Origin</option>
              {originOptions.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          )}
          <input type="text" placeholder="Destination" />
          <input type="text" placeholder="Date" />
          <button>Search</button>
        </div>
      </div>
      <ul>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
      </ul>
    </div>
  );
};

export default CarRentals;
