// Import necessary hooks and libraries
import React, { useState } from 'react';

const Flights = () => {
  // State fields
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handler for fetching offers
  const fetchOffers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slices: [{ origin, destination, departure_date: departureDate }],
          passengers: [{ type: passengerType }],
        }),
      });

      const data = await response.json();
      setOffers(data.data.offers);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields */}
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
          <button className="search-button" onClick={fetchOffers}>
            Search
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Response items */}
      <ul>
        {offers.map((offer, index) => (
          <li key={index} className="offer-item">
            {offer.slices.map((slice, sliceIndex) => (
              <div key={sliceIndex}>
                <p className="operator-name">
                  {slice.segments[0].operating_carrier.name}
                </p>
                <div>
                  <p className="departing-at">
                    {slice.segments[0].departing_at}
                  </p>
                  <p className="origin-name">{slice.origin.name}</p>
                </div>
                <p className="duration">{slice.segments[0].duration}</p>
                <div>
                  <p className="arriving-at">
                    {slice.segments[0].arriving_at}
                  </p>
                  <p className="destination-name">{slice.destination.name}</p>
                </div>
                <div>
                  <p className="total-amount">{offer.total_amount}</p>
                  <button className="select-button">Select</button>
                </div>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
