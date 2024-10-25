// Start of response-related UI elements

// React component for Flights with API integration
import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [offers, setOffers] = useState([]);
  const [passengerId, setPassengerId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
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

      const result = await response.json();
      setOffers(result.data.offers || []);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (offer) => {
    if (
      offer.slices &&
      offer.slices.length > 0 &&
      offer.slices[0].segments &&
      offer.slices[0].segments.length > 0 &&
      offer.slices[0].segments[0].passengers &&
      offer.slices[0].segments[0].passengers.length > 0
    ) {
      const selectedPassengerId = offer.slices[0].segments[0].passengers[0].passenger_id;
      setPassengerId(selectedPassengerId);
      // Additional selection logic can be added here
      console.log('Selected Passenger ID:', selectedPassengerId);
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
            value={maxConnections}
            onChange={(e) => setMaxConnections(Number(e.target.value))}
            placeholder="Max Connections"
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          {loading && <p>Loading...</p>}
        </div>
      </div>
      <ul>
        {offers.map((offer, index) => (
          <li
            key={index}
            className="offer-item"
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '16px',
              marginBottom: '16px',
              listStyleType: 'none',
            }}
          >
            <p><strong>Total Amount:</strong> {offer.total_amount}</p>
            {offer.slices.map((slice, sliceIndex) => (
              sliceIndex === 0 && slice.segments.length > 0 && (
                <div key={sliceIndex} style={{ marginTop: '8px' }}>
                  <p><strong>Operating Carrier:</strong> {slice.segments[0].marketing_carrier.name}</p>
                  <p><strong>Departing At:</strong> {new Date(slice.segments[0].departing_at).toLocaleString()}</p>
                  <p><strong>Duration:</strong> {slice.segments[0].duration}</p>
                  <p><strong>Arriving At:</strong> {new Date(slice.segments[0].arriving_at).toLocaleString()}</p>
                  <p><strong>Origin:</strong> {slice.origin.name}</p>
                  <p><strong>Destination:</strong> {slice.destination.name}</p>
                </div>
              )
            ))}
            <button
              onClick={() => handleSelect(offer)}
              style={{
                marginTop: '12px',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;

// End of response-related UI elements
