import React, { useState } from "react";
import FlightResults from './FlightResults';

const FlightSearch = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengerType, setPassengerType] = useState("adult");

  const handleSearch = async () => {
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

    const response = await fetch("http://localhost:5000/duffel-flights-list-offers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    console.log(data); // For now, just log the response
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
      <FlightResults />
    </div>
  );
};

export default FlightSearch;
