// Start of response
import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(0);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
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
          data: {
            slices: [
              {
                origin,
                destination,
                departure_date: departureDate
              }
            ],
            passengers: [
              {
                type: passengerType
              }
            ],
            max_connections: maxConnections
          }
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setOffers(result.data.offers || []);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (offer) => {
    const passengerIdValue = offer.slices[0].segments[0].passengers[0].passenger_id;
    setPassengerId(passengerIdValue);
    // You can add additional logic here if needed
    console.log('Selected Passenger ID:', passengerIdValue);
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
            placeholder="Max Connections"
            value={maxConnections}
            onChange={(e) => setMaxConnections(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          {loading && <div className="loading">Loading...</div>}
        </div>
      </div>
      <ul>
        {offers.map((offer, index) => {
          const firstSlice = offer.slices[0];
          const firstSegment = firstSlice.segments[0];
          const operatingCarrier = firstSegment.operating_carrier.name;
          const departingAt = firstSegment.departing_at;
          const duration = firstSegment.duration;
          const arrivingAt = firstSegment.arriving_at;
          const originName = firstSlice.origin.name;
          const destinationName = firstSlice.destination.name;

          return (
            <li key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
              <p><strong>Total Amount:</strong> {offer.total_amount}</p>
              <p><strong>Operating Carrier:</strong> {operatingCarrier}</p>
              <p><strong>Departing At:</strong> {departingAt}</p>
              <p><strong>Duration:</strong> {duration}</p>
              <p><strong>Arriving At:</strong> {arrivingAt}</p>
              <p><strong>Origin:</strong> {originName}</p>
              <p><strong>Destination:</strong> {destinationName}</p>
              <button onClick={() => handleSelect(offer)}>Select</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Flights;
// End of response
