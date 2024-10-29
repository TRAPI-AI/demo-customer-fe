// Adding API integration for flights
import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setOffers([]);

    const data = {
      data: {
        slices: {
          origin,
          destination,
          departure_date: departureDate,
        },
        passengers: {
          type: [passengerType],
        },
      },
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to fetch offers');
      }

      const result = await response.json();
      setOffers(result.data.offers || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
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
            <option value="infant_without_seat">Infant without Seat</option>
          </select>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}
      {/* Error Message */}
      {error && <p className="error">{error}</p>}
      {/* Response items go in this container */}
      <ul>
        {offers.map((offer) => (
          <li key={offer.id} className="offer-item">
            <p className="operator-name">{offer.operating_carrier.name}</p>
            <div>
              <p className="departing-at">
                {new Date(offer.slices[0].departure_time).toLocaleString()}
              </p>
              <p className="origin-name">{offer.slices[0].origin.iata_code}</p>
            </div>
            <p className="duration">{offer.duration}</p>
            <div>
              <p className="arriving-at">
                {new Date(offer.slices[0].arrival_time).toLocaleString()}
              </p>
              <p className="destination-name">{offer.slices[0].destination.iata_code}</p>
            </div>
            <div>
              <p className="total-amount">
                {offer.total_amount} {offer.total_currency}
              </p>
              <button className="select-button">Select</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
// End of API integration
