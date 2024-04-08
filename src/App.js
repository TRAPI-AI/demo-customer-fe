import React from "react";
import "./App.css";

function TripSearch() {
  return (
    <div className="flex-column">
      <nav className="nav">
        <span className="logo">Your Logo</span>
      </nav>

      <div className="search-area">
        <div className="search">
          <input className="input" />
          <input className="input" />
          <input className="input" />
          <button className="button">Search</button>
        </div>
      </div>

      <ul className="flex-column-center">
        <h2 className="logo">Results</h2>
        <li className="result">Result 1</li>
        <li className="result">Result 2</li>
        <li className="result">Result 3</li>
      </ul>
    </div>
  );
}

export default TripSearch;
