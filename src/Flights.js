// Start of generated React UI elements and integration

import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [offers, setOffers] = useState([]);
  const [passengerId, setPassengerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    const requestBody = {
      data: {
        slices: [
          {
            origin,
            destination,
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
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOffers(data.data.offers || []);
    } catch (err) {
      setError(err.message || 'Something went wrong');
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
            id="origin-input"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            id="destination-input"
          />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            id="departure-date-input"
          />
          <select value={passengerType} onChange={(e) => setPassengerType(e.target.value)} id="passenger-type-select">
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant_without_seat">Infant without seat</option>
          </select>
          <input
            type="number"
            min="0"
            value={maxConnections}
            onChange={(e) => setMaxConnections(e.target.value)}
            placeholder="Max Connections"
            id="max-connections-input"
          />
          <button className="search-button" onClick={handleSearch} id="search-button">
            Search
          </button>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
      <ul>
        {offers.map((offer) => {
          const firstSlice = offer.slices[0];
          const firstSegment = firstSlice?.segments[0];
          const firstPassenger = firstSegment?.passengers[0];
          const currentPassengerId = firstPassenger?.passenger_id;

          return (
            <li className="offer-item" key={offer.id} style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
              <p><strong>Total Amount:</strong> {offer.total_amount}</p>
              {firstSegment && (
                <>
                  <p><strong>Operating Carrier:</strong> {firstSegment.operating_carrier.name}</p>
                  <p><strong>Departing At:</strong> {firstSegment.departing_at}</p>
                  <p><strong>Arriving At:</strong> {firstSegment.arriving_at}</p>
                  <p><strong>Duration:</strong> {firstSegment.duration}</p>
                </>
              )}
              {firstSlice && (
                <>
                  <p><strong>Origin:</strong> {firstSlice.origin.name}</p>
                  <p><strong>Destination:</strong> {firstSlice.destination.name}</p>
                </>
              )}
              <button
                onClick={() => setPassengerId(currentPassengerId)}
                className="select-button"
                id={`select-button-${offer.id}`}
              >
                Select
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Flights;

// End of generated React UI elements and integration
