import React, { useState } from "react";
import FlightResults from './FlightResults';

const FlightSearch = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            slices: [{
              origin,
              destination,
              departure_date: departureDate,
            }],
            passengers: [{
              type: passengerType,
            }],
          },
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setOffers(result.data.offers);
      } else {
        console.error('Error fetching offers:', result.error);
      }
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
            className="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Origin"
          />
          <input
            className="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination"
          />
          <input
            className="departure-date"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          <select
            className="passenger-type"
            value={passengerType}
            onChange={(e) => setPassengerType(e.target.value)}
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant">Infant</option>
          </select>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {loading ? <p>Loading...</p> : <FlightResults offers={offers} />}
    </div>
  );
};

export default FlightSearch;