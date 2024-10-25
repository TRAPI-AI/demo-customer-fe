// Start of Flights Component

import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  const handleSearch = async () => {
    setIsLoading(true);
    const requestData = {
      data: {
        slices: [
          {
            origin: origin,
            destination: destination,
            departure_date: departureDate,
          },
        ],
        passengers: [
          {
            type: passengerType,
          },
        ],
        max_connections: maxConnections,
      },
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOffers(data.offers || []);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setIsLoading(false);
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
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          <select
            value={passengerType}
            onChange={(e) => setPassengerType(e.target.value)}
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant_without_seat">Infant without Seat</option>
          </select>
          <input
            type="number"
            min="0"
            max="10"
            value={maxConnections}
            onChange={(e) => setMaxConnections(parseInt(e.target.value, 10))}
          />
          <button className="search-button" onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      <ul>
        {isLoading && <li className="offer-item">Loading...</li>}
        {!isLoading && offers.length === 0 && (
          <li className="offer-item">No offers found.</li>
        )}
        {!isLoading &&
          offers.map((offer, index) => (
            <li key={index} className="offer-item">
              <p className="field-duration">{offer.duration}</p>
              {/* Add more offer details as needed */}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Flights;

// End of Flights Component
