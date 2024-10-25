// Begin response

// React component for Flights with API integration

import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setOffers([]);

    const requestBody = {
      data: {
        slices: [
          {
            origin: origin,
            destination: destination,
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

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOffers(data.data.offers || []);
    } catch (err) {
      setError('Failed to fetch offers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (passengerId) => {
    // Handle the select action with passengerId
    console.log('Selected Passenger ID:', passengerId);
    // You can add more functionality here as needed
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
            className="input-origin"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="input-destination"
          />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="input-departure-date"
          />
          <select
            value={passengerType}
            onChange={(e) => setPassengerType(e.target.value)}
            className="select-passenger-type"
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
            placeholder="Max Connections"
            className="input-max-connections"
          />
          <button className="search-button" onClick={handleSearch}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      {loading && <p>Loading offers...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {offers.length > 0 ? (
          offers.map((offer, index) => {
            // Extract total_amount
            const totalAmount = offer.total_amount || 'N/A';

            // Assuming each offer has at least one slice
            const firstSlice = offer.slices && offer.slices[0];
            const originName = firstSlice && firstSlice.origin && firstSlice.origin.name;
            const destinationName = firstSlice && firstSlice.destination && firstSlice.destination.name;

            // Assuming each slice has at least one segment
            const firstSegment = firstSlice && firstSlice.segments && firstSlice.segments[0];
            const operatingCarrierName =
              firstSegment &&
              firstSegment.operating_carrier &&
              firstSegment.operating_carrier.name;
            const departingAt = firstSegment && firstSegment.departing_at;
            const duration = firstSegment && firstSegment.duration;
            const arrivingAt = firstSegment && firstSegment.arriving_at;

            // Extract passengerId from the first passenger of the first segment
            const passengerId =
              firstSegment &&
              firstSegment.passengers &&
              firstSegment.passengers[0] &&
              firstSegment.passengers[0].passenger_id;

            return (
              <li key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <p className="field-total-amount">Total Amount: {totalAmount}</p>
                <p className="field-origin">Origin: {originName || 'N/A'}</p>
                <p className="field-destination">Destination: {destinationName || 'N/A'}</p>
                <p className="field-operating-carrier">Operating Carrier: {operatingCarrierName || 'N/A'}</p>
                <p className="field-departing-at">Departing At: {departingAt || 'N/A'}</p>
                <p className="field-arriving-at">Arriving At: {arrivingAt || 'N/A'}</p>
                <p className="field-duration">Duration: {duration || 'N/A'}</p>
                <button className="select-button" onClick={() => handleSelect(passengerId)}>
                  Select
                </button>
              </li>
            );
          })
        ) : (
          !loading && <p>No offers available.</p>
        )}
      </ul>
    </div>
  );
};

export default Flights;

// End response
