import React, { useState } from "react";
import FlightResults from './FlightResults';

const FlightSearch = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [flightOffers, setFlightOffers] = useState([]);

  const handleSearch = async () => {
    const requestBody = {
      data: {
        slices: [
          {
            origin: origin,
            destination: destination,
            departure_date: departureDate,
          }
        ],
        passengers: [
          {
            type: passengerType
          }
        ]
      }
    };

    try {
      const response = await fetch('/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      setFlightOffers(data.data.offers);
    } catch (error) {
      console.error("Error fetching flight offers:", error);
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
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <FlightResults flightOffers={flightOffers} />
    </div>
  );
};

export default FlightSearch;