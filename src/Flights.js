// Begin response-related UI elements

import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const [passengerId, setPassengerId] = useState(null); // State to store passengerId

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setOffers([]);

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
        cabin_class: 'economy', // Default value or can be added as another field
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
      setError(err.message);
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
      // Additional logic can be added here as needed
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
            onChange={(e) => setMaxConnections(parseInt(e.target.value, 10))}
          />
          <button className="search-button" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      
      <ul>
        {offers.map((offer, index) => {
          // Extracting required data
          const totalAmount = offer.total_amount;
          const firstSlice = offer.slices && offer.slices[0];
          const firstSegment = firstSlice && firstSlice.segments && firstSlice.segments[0];
          const operatingCarrierName = firstSegment && firstSegment.operating_carrier && firstSegment.operating_carrier.name;
          const departingAt = firstSegment && firstSegment.departing_at;
          const duration = firstSegment && firstSegment.duration;
          const arrivingAt = firstSegment && firstSegment.arriving_at;
          const originName = firstSlice && firstSlice.origin && firstSlice.origin.name;
          const destinationName = firstSlice && firstSlice.destination && firstSlice.destination.name;

          return (
            <li key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
              <p><strong>Total Amount:</strong> {totalAmount}</p>
              {operatingCarrierName && (
                <p><strong>Operating Carrier:</strong> {operatingCarrierName}</p>
              )}
              {departingAt && (
                <p><strong>Departing At:</strong> {new Date(departingAt).toLocaleString()}</p>
              )}
              {duration && (
                <p><strong>Duration:</strong> {duration}</p>
              )}
              {arrivingAt && (
                <p><strong>Arriving At:</strong> {new Date(arrivingAt).toLocaleString()}</p>
              )}
              {originName && (
                <p><strong>Origin:</strong> {originName}</p>
              )}
              {destinationName && (
                <p><strong>Destination:</strong> {destinationName}</p>
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

// End response-related UI elements
