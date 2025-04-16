import React, { useState } from "react";
import FlightResults from './FlightResults';
import axios from 'axios';

const FlightSearch = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [error, setError] = useState(null);
  const [offers, setOffers] = useState([]);

  const handleSearch = async () => {
    if (!origin || !destination || !departureDate) {
      setError('Please fill in all fields.');
      return;
    }

    const requestBody = {
      data: {
        slices: [
          {
            origin,
            destination,
            departure_date: departureDate,
            departure_time: { from: "00:00", to: "23:59" },
            arrival_time: { from: "00:00", to: "23:59" }
          }
        ],
        passengers: [
          {
            type: passengerType
          }
        ],
        max_connections: 1,
        cabin_class: "economy"
      }
    };

    try {
      const response = await axios.post('http://localhost:5000/duffel-flights-list-offers', requestBody);
      setOffers(response.data.data.offers);
      setError(null);
    } catch (err) {
      setError('Failed to fetch flight offers.');
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input className="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Origin" />
          <input className="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" />
          <input className="departure-date" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
          <select className="passenger-type" value={passengerType} onChange={(e) => setPassengerType(e.target.value)}>
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant">Infant</option>
          </select>
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
      <FlightResults offers={offers} />
    </div>
  );
};

export default FlightSearch;
