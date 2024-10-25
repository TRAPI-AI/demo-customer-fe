// Start of generated code

import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState('');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const requestData = {
      data: {
        slices: {
          origin: origin,
          destination: destination,
          departure_date: departureDate,
        },
        passengers: {
          type: passengerType,
        },
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

      const result = await response.json();
      setOffers(result.data.data.offers || []);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (passengerId) => {
    // You can handle the selected passengerId here
    console.log('Selected Passenger ID:', passengerId);
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
            <option value="infant_without_seat">Infant without seat</option>
          </select>
          <input
            type="number"
            placeholder="Max Connections"
            value={maxConnections}
            onChange={(e) => setMaxConnections(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          {loading && <div className="loading-indicator">Loading...</div>}
        </div>
      </div>
      <ul>
        {offers.map((offer, index) => {
          const firstSlice = offer.slices[0];
          const firstSegment = firstSlice.segments[0];
          const passengerId = firstSegment.passengers[0].passenger_id;

          return (
            <li key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <div><strong>Total Amount:</strong> {offer.total_amount}</div>
              <div><strong>Operating Carrier:</strong> {firstSegment.operating_carrier.name}</div>
              <div><strong>Departing At:</strong> {firstSegment.departing_at}</div>
              <div><strong>Duration:</strong> {firstSegment.duration}</div>
              <div><strong>Arriving At:</strong> {firstSegment.arriving_at}</div>
              <div><strong>Origin:</strong> {firstSlice.origin.name}</div>
              <div><strong>Destination:</strong> {firstSlice.destination.name}</div>
              <button onClick={() => handleSelect(passengerId)}>Select</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Flights;

// End of generated code
