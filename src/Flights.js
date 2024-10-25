// Start of response

// React component for Flights with API integration
import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState('');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passengerId, setPassengerId] = useState('');

  const handleSearch = async () => {
    setLoading(true);
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

      const data = await response.json();
      setOffers(data.data.offers || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
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
      console.log('Selected Passenger ID:', selectedPassengerId);
      // You can perform additional actions here with the passengerId
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
          <select value={passengerType} onChange={(e) => setPassengerType(e.target.value)}>
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant_without_seat">Infant Without Seat</option>
          </select>
          <input
            type="number"
            placeholder="Max Connections"
            value={maxConnections}
            onChange={(e) => setMaxConnections(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      <ul>
        {offers.map((offer, index) => (
          <li key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <p><strong>Total Amount:</strong> {offer.total_amount}</p>
            {offer.slices && offer.slices.length > 0 && (
              <div>
                <p><strong>Origin:</strong> {offer.slices[0].origin.name}</p>
                <p><strong>Destination:</strong> {offer.slices[0].destination.name}</p>
                {offer.slices[0].segments && offer.slices[0].segments.length > 0 && (
                  <div>
                    <p><strong>Operating Carrier:</strong> {offer.slices[0].segments[0].operating_carrier.name}</p>
                    <p><strong>Departing At:</strong> {offer.slices[0].segments[0].departing_at}</p>
                    <p><strong>Duration:</strong> {offer.slices[0].segments[0].duration}</p>
                    <p><strong>Arriving At:</strong> {offer.slices[0].segments[0].arriving_at}</p>
                  </div>
                )}
              </div>
            )}
            <button onClick={() => handleSelect(offer)}>Select</button>
          </li>
        ))}
      </ul>
      {passengerId && (
        <div>
          <p>Selected Passenger ID: {passengerId}</p>
        </div>
      )}
    </div>
  );
};

export default Flights;

// End of response
