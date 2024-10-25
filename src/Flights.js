// Start of generated code
import React, { useState } from 'react';

const Flights = () => {
  // State fields
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [passengerId, setPassengerId] = useState('');

  // Handler for form submission
  const handleSearch = async () => {
    setLoading(true);
    const requestData = {
      data: {
        slices: [
          {
            origin,
            destination,
            departure_time: { from: "00:00", to: "23:59" }, // Placeholder times
            departure_date: departureDate,
            arrival_time: { from: "00:00", to: "23:59" }, // Placeholder times
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOffers(data.data.offers);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setLoading(false);
    }
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
            <option value="infant_without_seat">Infant without seat</option>
          </select>
          <input
            type="number"
            min="0"
            placeholder="Max Connections"
            value={maxConnections}
            onChange={(e) => setMaxConnections(parseInt(e.target.value, 10))}
          />
          <button
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      {/* Response items go in this container */}
      <ul>
        {offers.length > 0 ? (
          offers.map((offer, index) => (
            <li
              className="offer-item"
              key={index}
              style={{
                border: '1px solid #ccc',
                padding: '16px',
                marginBottom: '16px',
                borderRadius: '8px',
              }}
            >
              <p><strong>Total Amount:</strong> {offer.total_amount}</p>
              {offer.slices.map((slice, sliceIndex) => (
                <div key={sliceIndex} style={{ marginTop: '8px' }}>
                  {slice.segments.length > 0 && (
                    <div>
                      <p><strong>Operating Carrier:</strong> {slice.segments[0].operating_carrier.name}</p>
                      <p><strong>Departing At:</strong> {new Date(slice.segments[0].departing_at).toLocaleString()}</p>
                      <p><strong>Duration:</strong> {slice.segments[0].duration}</p>
                      <p><strong>Arriving At:</strong> {new Date(slice.segments[0].arriving_at).toLocaleString()}</p>
                    </div>
                  )}
                  <p><strong>Origin:</strong> {slice.origin.name}</p>
                  <p><strong>Destination:</strong> {slice.destination.name}</p>
                </div>
              ))}
              <button
                style={{
                  marginTop: '12px',
                  padding: '8px 16px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const firstSlice = offer.slices[0];
                  if (firstSlice && firstSlice.segments[0] && firstSlice.segments[0].passengers[0]) {
                    setPassengerId(firstSlice.segments[0].passengers[0].passenger_id);
                  }
                }}
              >
                Select
              </button>
            </li>
          ))
        ) : (
          !loading && <li>No offers available.</li>
        )}
      </ul>
    </div>
  );
};

export default Flights;
// End of generated code
