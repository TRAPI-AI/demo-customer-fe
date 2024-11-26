import React from "react";
import FlightResults from './FlightResults'

const FlightSearch = () => {
  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input className="origin" />
          <input className="destination" />
          <input className="departure-date" type="date" />
          <select className="passenger-type">
            <option value="adult">Option</option>
          </select>
          <button className="search-button">Search</button>
        </div>
      </div>
      <FlightResults />
    </div>
  );
};

export default FlightSearch;
