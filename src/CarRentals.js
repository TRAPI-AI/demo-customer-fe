import React, { useState } from 'react';

const CarRentals = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [originNames, setOriginNames] = useState([]);
  const [destinationNames, setDestinationNames] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/indie-campers-list-locations?origin=${origin}&destination=${destination}`, {
        method: 'GET',
      });
      const data = await response.json();
      setOffers(data);

      // Extract names from the response data
      const names = data.data.map(item => item.name);

      // Determine which field was used to make the request and update accordingly
      if (origin) {
        setOriginNames(names);
      } else if (destination) {
        setDestinationNames(names);
      }
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
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {offers.map((offer, index) => (
            <li key={index} className="offer-item">
              {offer}
            </li>
          ))}
        </ul>
      )}
      <div>
        <h3>Origin Names</h3>
        <ul>
          {originNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Destination Names</h3>
        <ul>
          {destinationNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarRentals;
