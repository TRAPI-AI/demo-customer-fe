import React, { useState } from "react";
import FlightResults from './FlightResults';

const FlightSearch = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [offers, setOffers] = useState([]);

  const handleSearch = async () => {
    const requestBody = {
      data: {
        slices: [
          {
            origin,
            destination,
            departure_date: departureDate,
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

    const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    setOffers(data.data.offers);
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
      </div>
      <FlightResults offers={offers} />
    </div>
  );
};

export default FlightSearch;

// End of refactored code

This refactored code integrates the frontend with the backend by mapping the request and response data to the appropriate fields. The `FlightSearch` component sends a POST request to the backend with the search parameters, and the `FlightResults` component displays the offers returned from the backend.