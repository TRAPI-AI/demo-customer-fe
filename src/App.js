import React from "react";
import "./App.css";

function TripSearch() {
  return (
    <div>
      <nav />

      <div className="search-area">
        <span>Demo Travel Tool</span>
        <div className="search">
          <input />
          <input />
          <input />
          <button>Search</button>
        </div>
      </div>

      <ul>
        <h2>Results</h2>
        <li>Result 1</li>
        <li>Result 2</li>
        <li>Result 3</li>
      </ul>
    </div>
  );
}

export default TripSearch;
