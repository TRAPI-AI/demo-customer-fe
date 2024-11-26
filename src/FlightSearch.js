import React, { useState } from "react";
import FlightResults from './FlightResults';

const FlightSearch = () => {
  const [loading, setLoading] = useState(false);
  const [flightData, setFlightData] = useState(null);

  const handleSearchClick = async () => {
    setLoading(true);
    const requestBody = {
      data: {
        slices: [
          {
            origin: document.querySelector('.origin').value,
            destination: document.querySelector('.destination').value,
            departure_date: document.querySelector('.departure-date').value,
          }
        ],
        passengers: [
          {
            type: document.querySelector('.passenger-type').value
          }
        ],
        max_connections: 1,
        cabin_class: "economy"
      }
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      setFlightData(data);
    } catch (error) {
      console.error("Error fetching flight data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input className="origin" placeholder="Origin" />
          <input className="destination" placeholder="Destination" />
          <input className="departure-date" type="date" />
          <select className="passenger-type">
            <option value="adult">Adult</option>
          </select>
          <button className="search-button" onClick={handleSearchClick}>Search</button>
        </div>
      </div>
      {loading ? <p>Loading...</p> : <FlightResults flightData={flightData} />}
    </div>
  );
};

export default FlightSearch;