// Response-related UI elements for displaying API response data

import React, { useState } from 'react';

const Flights = () => {
  // State fields
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passengerId, setPassengerId] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const data = await response.json();
      setOffers(data.data.offers || []);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle select button click
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
      console.log('Selected Passenger ID:', selectedPassengerId);
      // You can perform additional actions with passengerId here
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <form onSubmit={handleSubmit}>
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
              placeholder="Departure Date"
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
              <option value="infant_without_seat">Infant Without Seat</option>
            </select>
            <input
              type="number"
              placeholder="Max Connections"
              value={maxConnections}
              onChange={(e) => setMaxConnections(parseInt(e.target.value, 10))}
              min="0"
              required
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          {loading && <p>Loading...</p>}
        </div>
      </div>
      {/* Response items go in this container */}
      <ul>
        {offers.length > 0 && offers.map((offer, index) => (
          <li key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
            <p><strong>Total Amount:</strong> {offer.total_amount}</p>
            {offer.slices && offer.slices.length > 0 && (
              <div>
                <p><strong>Origin:</strong> {offer.slices[0].origin.name}</p>
                <p><strong>Destination:</strong> {offer.slices[0].destination.name}</p>
                {offer.slices[0].segments && offer.slices[0].segments.length > 0 && (
                  <div>
                    <p><strong>Operating Carrier:</strong> {offer.slices[0].segments[0].operating_carrier.name}</p>
                    <p><strong>Departing At:</strong> {new Date(offer.slices[0].segments[0].departing_at).toLocaleString()}</p>
                    <p><strong>Duration:</strong> {offer.slices[0].segments[0].duration}</p>
                    <p><strong>Arriving At:</strong> {new Date(offer.slices[0].segments[0].arriving_at).toLocaleString()}</p>
                  </div>
                )}
              </div>
            )}
            <button onClick={() => handleSelect(offer)}>Select</button>
          </li>
        ))}
        {offers.length === 0 && !loading && (
          <li className="offer-item">No offers available.</li>
        )}
      </ul>
    </div>
  );
};

export default Flights;

// End of response-related UI elements for displaying API response data
