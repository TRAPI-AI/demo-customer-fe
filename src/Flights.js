// Here's the updated Flights component with the required changes
import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [passengerId, setPassengerId] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          origin,
          destination,
          departure_date: departureDate,
          passenger_type: passengerType,
          max_connections: maxConnections
        })
      });
      const data = await response.json();
      setOffers(data.data.offers || []);

      // Store the passengerId from the response
      if (
        data &&
        data.data &&
        data.data.offers &&
        data.data.offers.length > 0 &&
        data.data.offers[0].slices &&
        data.data.offers[0].slices.length > 0 &&
        data.data.offers[0].slices[0].segments &&
        data.data.offers[0].slices[0].segments.length > 0 &&
        data.data.offers[0].slices[0].segments[0].passengers &&
        data.data.offers[0].slices[0].segments[0].passengers.length > 0
      ) {
        const passengerIdValue =
          data.data.offers[0].slices[0].segments[0].passengers[0].passenger_id;
        setPassengerId(passengerIdValue);
      }
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
            <option value="infant_without_seat">Infant Without Seat</option>
          </select>
          <input
            type="number"
            min="0"
            placeholder="Max Connections"
            value={maxConnections}
            onChange={(e) => setMaxConnections(e.target.value)}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      {loading && <div className="loading-indicator">Loading...</div>}
      <ul>
        {offers.map((offer, index) => (
          <li
            key={index}
            className="offer-item"
            style={{
              border: '1px solid black',
              padding: '10px',
              marginBottom: '10px'
            }}
          >
            <p>Total Amount: {offer.total_amount}</p>
            {offer.slices &&
              offer.slices.map((slice, sliceIndex) => (
                <div key={sliceIndex}>
                  <p>
                    Slice from {slice.origin?.name} to {slice.destination?.name}
                  </p>
                  {slice.segments && slice.segments.length > 0 && (
                    <div>
                      <p>
                        Operating Carrier:{' '}
                        {slice.segments[0].operating_carrier?.name}
                      </p>
                      <p>Departing At: {slice.segments[0].departing_at}</p>
                      <p>Duration: {slice.segments[0].duration}</p>
                      <p>Arriving At: {slice.segments[0].arriving_at}</p>
                    </div>
                  )}
                </div>
              ))}
            <button>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
// End of the React component
