import React from "react";
import "./App.css";

function Frontend() {
  return (
    <div>
      <nav />

      <div className="search-area">
        <span>Demo Travel Tool</span>
        <div className="search">
          {/* Input fields go in this container */}
          <input />
          <input />
          <input />
          <button>Search</button>
        </div>
      </div>

      <ul>
        {/* Response items go in this container */}

        <h2>Results</h2>
        <li className="offer-item">Result 1</li>
        <li className="offer-item">Result 2</li>
        <li className="offer-item">Result 3</li>
      </ul>
    </div>
  );
}

export default Frontend;
