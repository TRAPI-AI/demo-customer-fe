// Start of generated React UI elements and API integration

import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [passengerId, setPassengerId] = useState('');

  const handleSearch = async () => {
    setLoading(true);
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

      const data = await response.json();
      setOffers(data.data.offers || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
      // You might want to handle the error state here
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
      // You can perform additional actions with passengerId here
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
            max="5"
            value={maxConnections}
            onChange={(e) => setMaxConnections(Number(e.target.value))}
            placeholder="Max Connections"
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          {loading && <div className="loading">Loading...</div>}
        </div>
      </div>
      <ul>
        {offers.map((offer, index) => {
          const firstSlice = offer.slices && offer.slices[0];
          const firstSegment =
            firstSlice && firstSlice.segments && firstSlice.segments[0];
          return (
            <li
              key={index}
              className="offer-item"
              style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}
            >
              <p><strong>Total Amount:</strong> {offer.total_amount}</p>
              {firstSegment && (
                <>
                  <p><strong>Operating Carrier:</strong> {firstSegment.operating_carrier.name}</p>
                  <p><strong>Departing At:</strong> {firstSegment.departing_at}</p>
                  <p><strong>Duration:</strong> {firstSegment.duration}</p>
                  <p><strong>Arriving At:</strong> {firstSegment.arriving_at}</p>
                </>
              )}
              {firstSlice && (
                <>
                  <p><strong>Origin:</strong> {firstSlice.origin.name}</p>
                  <p><strong>Destination:</strong> {firstSlice.destination.name}</p>
                </>
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

// End of generated React UI elements and API integration
