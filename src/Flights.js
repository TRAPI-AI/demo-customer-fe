// Start of response-related UI elements

// React UI and API integration for Flights component
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
  const [passengerId, setPassengerId] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Construct request payload
    const requestData = {
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
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setOffers(result.data.offers || []); // Adjusted based on actual API response structure
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
          <select
            value={passengerType}
            onChange={(e) => setPassengerType(e.target.value)}
            required
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant_without_seat">Infant without Seat</option>
          </select>
          <input
            type="number"
            min="0"
            value={maxConnections}
            onChange={(e) => setMaxConnections(Number(e.target.value))}
            required
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
      {/* Response items go in this container */}
      <ul>
        {loading && <li className="offer-item">Loading...</li>}
        {!loading && offers.length === 0 && <li className="offer-item">No offers found.</li>}
        {!loading &&
          offers.map((offer, index) => {
            // Safely access nested properties
            const firstSlice = offer.slices && offer.slices[0];
            const firstSegment =
              firstSlice && firstSlice.segments && firstSlice.segments[0];
            const firstPassenger =
              firstSegment &&
              firstSegment.passengers &&
              firstSegment.passengers[0];

            return (
              <li
                key={index}
                className="offer-item"
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px',
                }}
              >
                <p><strong>Total Amount:</strong> {offer.total_amount}</p>
                {firstSegment && (
                  <div>
                    <p><strong>Operating Carrier:</strong> {firstSegment.operating_carrier.name}</p>
                    <p><strong>Departing At:</strong> {new Date(firstSegment.departing_at).toLocaleString()}</p>
                    <p><strong>Duration:</strong> {firstSegment.duration}</p>
                    <p><strong>Arriving At:</strong> {new Date(firstSegment.arriving_at).toLocaleString()}</p>
                  </div>
                )}
                {firstSlice && (
                  <div>
                    <p><strong>Origin:</strong> {firstSlice.origin.name}</p>
                    <p><strong>Destination:</strong> {firstSlice.destination.name}</p>
                  </div>
                )}
                <button
                  onClick={() => {
                    if (firstPassenger) {
                      setPassengerId(firstPassenger.passenger_id);
                      console.log('Selected Passenger ID:', firstPassenger.passenger_id);
                    }
                  }}
                  style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
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

// End of response-related UI elements
