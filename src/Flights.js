// Start of response-related UI elements
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

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    const payload = {
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
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch offers');
      }

      const data = await response.json();
      setOffers(data.data.offers || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (passengerId) => {
    // Handle the select action here
    console.log(`Selected passenger ID: ${passengerId}`);
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
            className="origin-input"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="destination-input"
          />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="departure-date-input"
          />
          <select
            value={passengerType}
            onChange={(e) => setPassengerType(e.target.value)}
            className="passenger-type-select"
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant_without_seat">Infant Without Seat</option>
          </select>
          <input
            type="number"
            min="0"
            value={maxConnections}
            onChange={(e) => setMaxConnections(parseInt(e.target.value, 10))}
            placeholder="Max Connections"
            className="max-connections-input"
          />
          <button className="search-button" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
      <ul>
        {loading && <li>Loading offers...</li>}
        {!loading && offers.length > 0 && offers.map((offer, index) => {
          const firstSlice = offer.slices[0];
          const firstSegment = firstSlice.segments[0];
          const passengerId = firstSegment.passengers[0].passenger_id;

          return (
            <li key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <p className="total-amount">Total Amount: {offer.total_amount}</p>
              <p className="operating-carrier">Operating Carrier: {firstSegment.operating_carrier.name}</p>
              <p className="departing-at">Departing At: {new Date(firstSegment.departing_at).toLocaleString()}</p>
              <p className="duration">Duration: {firstSegment.duration}</p>
              <p className="arriving-at">Arriving At: {new Date(firstSegment.arriving_at).toLocaleString()}</p>
              <p className="origin-name">Origin: {firstSlice.origin.name}</p>
              <p className="destination-name">Destination: {firstSlice.destination.name}</p>
              <button className="select-button" onClick={() => handleSelect(passengerId)}>
                Select
              </button>
            </li>
          );
        })}
        {!loading && offers.length === 0 && <li>No offers found.</li>}
      </ul>
    </div>
  );
};

export default Flights;
// End of response-related UI elements
