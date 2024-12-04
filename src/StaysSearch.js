import React from "react";
import StaysResults from './StaysResults'

const StaysSearch = () => {
  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input placeholder="Place" className="placeName" />
          <input className="checkIn" type="date" />
          <input className="checkOut" type="date" />
          <input placeholder="Adults" className="adults" type="number" />
          <input placeholder="Children" className="children" type="number" />
          <button className="search-button">Search</button>
        </div>
      </div>
      <StaysResults />
    </div>
  );
};

export default StaysSearch;
