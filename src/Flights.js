// Start of response-related UI elements

// React component for Flights with form fields and API integration
import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(0);
  const [offers, setOffers] = useState([]);
  const [passengerId, setPassengerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    const requestBody = {
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
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch offers.');
      }

      const data = await response.json();
      setOffers(data.data.offers || []);
    } catch (err) {
      setError(err.message);
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
            min="0"
            value={maxConnections}
            onChange={(e) => setMaxConnections(Number(e.target.value))}
            placeholder="Max Connections"
          />
          <button className="search-button" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
      <ul>
        {offers.length > 0 ? (
          offers.map((offer) => {
            const firstSlice = offer.slices[0];
            const firstSegment = firstSlice.segments[0];
            const passenger = firstSegment.passengers[0];
            return (
              <li key={offer.id} className="offer-item" style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
                <p><strong>Total Amount:</strong> {offer.total_amount}</p>
                <p><strong>Operating Carrier:</strong> {firstSegment.operating_carrier.name}</p>
                <p><strong>Departing At:</strong> {firstSegment.departing_at}</p>
                <p><strong>Duration:</strong> {firstSegment.duration}</p>
                <p><strong>Arriving At:</strong> {firstSegment.arriving_at}</p>
                <p><strong>Origin:</strong> {firstSlice.origin.name}</p>
                <p><strong>Destination:</strong> {firstSlice.destination.name}</p>
                <button onClick={() => setPassengerId(passenger.passenger_id)}>
                  Select
                </button>
              </li>
            );
          })
        ) : (
          !loading && <li className="offer-item">No offers found.</li>
        )}
      </ul>
    </div>
  );
};

export default Flights;

// End of Flights component
