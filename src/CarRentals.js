import React, { useState } from 'react';

const CarRentals = () => {
  const [originOptions, setOriginOptions] = useState([]);
  const [origin, setOrigin] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchOriginOptions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/indie-campers-list-locations', {
        method: 'GET',
      });
      const data = await response.json();
      // Assuming the response structure is { "data": [ { "name": "str*" } ], "message": "str*" }
      setOriginOptions(data.data);
    } catch (error) {
      console.error('Error fetching origin options:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <select onClick={fetchOriginOptions} onChange={handleOriginChange} value={origin}>
            <option value="" disabled>Select Origin</option>
            {originOptions.map((option, index) => (
              <option key={index} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <input />
          <input />
          <button>Search</button>
        </div>
        {loading && <div>Loading...</div>}
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
