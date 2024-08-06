import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);

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
      setOffers(data.data.offers);
    } catch (error) {
      console.error('Error:', error);
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
            placeholder="Max Connections"
            value={maxConnections}
            onChange={(e) => setMaxConnections(e.target.value)}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      <ul>
        {offers.map((offer, index) => (
          <li key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <p>Total Amount: {offer.total_amount}</p>
            {offer.slices.map((slice, sliceIndex) => (
              <div key={sliceIndex}>
                <p>Origin: {slice.origin.name}</p>
                <p>Destination: {slice.destination.name}</p>
                {slice.segments.length > 0 && (
                  <div>
                    <p>Operating Carrier: {slice.segments[0].operating_carrier.name}</p>
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
