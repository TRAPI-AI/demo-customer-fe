// Start of React component for flight search with API integration

import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [offers, setOffers] = useState([]);
  const [passengerId, setPassengerId] = useState(null);
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
        cabin_class: 'economy', // Default value; can be made dynamic if needed
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
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOffers(data.data.offers || []);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (offer) => {
    if (
      offer.slices &&
      offer.slices[0] &&
      offer.slices[0].segments &&
      offer.slices[0].segments[0] &&
      offer.slices[0].segments[0].passengers &&
      offer.slices[0].segments[0].passengers[0]
    ) {
      setPassengerId(offer.slices[0].segments[0].passengers[0].passenger_id);
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
            <option value="infant_without_seat">Infant without Seat</option>
          </select>
          <input
            type="number"
            min="0"
            placeholder="Max Connections"
            value={maxConnections}
            onChange={(e) => setMaxConnections(parseInt(e.target.value, 10))}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          {loading && <div className="loading-indicator">Loading...</div>}
        </div>
      </div>
      <ul>
        {offers.map((offer, index) => {
          const firstSlice = offer.slices && offer.slices[0];
          const firstSegment = firstSlice && firstSlice.segments && firstSlice.segments[0];
          const operatingCarrier = firstSegment && firstSegment.operating_carrier && firstSegment.operating_carrier.name;
          const departingAt = firstSegment && firstSegment.departing_at;
          const duration = firstSegment && firstSegment.duration;
          const arrivingAt = firstSegment && firstSegment.arriving_at;
          const originName = firstSlice && firstSlice.origin && firstSlice.origin.name;
          const destinationName = firstSlice && firstSlice.destination && firstSlice.destination.name;

          return (
            <li key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
              <p><strong>Total Amount:</strong> {offer.total_amount}</p>
              {operatingCarrier && (
                <>
                  <p><strong>Operating Carrier:</strong> {operatingCarrier}</p>
                  <p><strong>Departing At:</strong> {new Date(departingAt).toLocaleString()}</p>
                  <p><strong>Duration:</strong> {duration}</p>
                  <p><strong>Arriving At:</strong> {new Date(arrivingAt).toLocaleString()}</p>
                </>
              )}
              {originName && destinationName && (
                <p><strong>Route:</strong> {originName} ➔ {destinationName}</p>
              )}
              <button onClick={() => handleSelect(offer)}>Select</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Flights;
// End of React component for flight search
