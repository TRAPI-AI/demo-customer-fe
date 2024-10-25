// Response-related UI elements

import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passengerId, setPassengerId] = useState(null); // Added state for passengerId

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
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
        cabin_class: 'economy', // Default value; can be made dynamic if needed
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

      const offersData = await response.json();
      setOffers(offersData.data.offers || []);
    } catch (err) {
      setError('Failed to fetch flight offers.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (passenger_id) => {
    setPassengerId(passenger_id);
    console.log('Selected Passenger ID:', passenger_id);
    // You can add additional logic here as needed
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
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
            placeholder="Departure Date"
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
            placeholder="Max Connections"
            value={maxConnections}
            onChange={(e) => setMaxConnections(parseInt(e.target.value, 10))}
          />
          <button className="search-button" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      {/* Response items go in this container */}
      {loading && <p>Loading offers...</p>}
      {error && <p className="error">{error}</p>}
      <div>
        {offers.map((offer, index) => {
          const firstSlice = offer.slices[0];
          const firstSegment = firstSlice.segments[0];
          const passengerIdValue = firstSegment.passengers[0].passenger_id;

          return (
            <div key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
              <p><strong>Total Amount:</strong> {offer.total_amount}</p>
              <p><strong>Operating Carrier:</strong> {firstSegment.operating_carrier.name}</p>
              <p><strong>Departing At:</strong> {firstSegment.departing_at}</p>
              <p><strong>Duration:</strong> {firstSegment.duration}</p>
              <p><strong>Arriving At:</strong> {firstSegment.arriving_at}</p>
              <p><strong>Origin:</strong> {firstSlice.origin.name}</p>
              <p><strong>Destination:</strong> {firstSlice.destination.name}</p>
              <button onClick={() => handleSelect(passengerIdValue)}>Select</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Flights;

// End response-related UI elements
