// Start of generated React UI elements and API handler for Flights component

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
      console.log('Selected Passenger ID:', offer.slices[0].segments[0].passengers[0].passenger_id);
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
          <button
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      <ul>
        {offers.length > 0 ? (
          offers.map((offer, index) => (
            <li key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
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
          ))
        ) : (
          !loading && <li className="offer-item">No offers found.</li>
        )}
      </ul>
      {passengerId && (
        <div>
          <p><strong>Selected Passenger ID:</strong> {passengerId}</p>
        </div>
      )}
    </div>
  );
};

export default Flights;

// End of generated React UI elements and API handler
