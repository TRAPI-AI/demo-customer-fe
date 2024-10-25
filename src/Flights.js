// Start of generated React component

import React, { useState } from 'react';

const Flights = () => {
  // State fields
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  // Handler for form submission
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
                origin: origin,
                destination: destination,
                departure_date: departureDate
              }
            ],
            passengers: [
              {
                type: passengerType
              }
            ]
          }
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOffers(data.data.offers || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go here */}
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Origin"
            required
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination"
            required
          />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
          <select
            value={passengerType}
            onChange={(e) => setPassengerType(e.target.value)}
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant_without_seat">Infant without seat</option>
          </select>
          <button className="search-button" onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      {/* Response items go here */}
      <ul>
        {offers.map((offer, index) => {
          const slice = offer.slices[0];
          const segment = slice.segments[0];
          const passengerId = segment.passengers[0].passenger_id;

          return (
            <li key={index} className="offer-item">
              <p className="operator-name">{segment.operating_carrier.name}</p>
              <div className="flight-details">
                <div className="departure-info">
                  <p className="departing-at">
                    {new Date(segment.departing_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="duration">{segment.duration}</p>
                  <p className="arriving-at">
                    {new Date(segment.arriving_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="route-info">
                  <p className="origin-name">{slice.origin.name}</p>
                  <p className="destination-name">{slice.destination.name}</p>
                </div>
              </div>
              <div className="offer-summary">
                <p className="total-amount">${offer.total_amount}</p>
                <button className="select-button" onClick={() => console.log(`Selected Passenger ID: ${passengerId}`)}>
                  Select
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Flights;

// End of generated React component
