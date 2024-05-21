import React from "react";
import "./App.css";

function Frontend() {
  return (
    <div>
      <nav>
        <img src="logo2.png" alt="Logo" className="navbar-logo" />
        <span>Demo Travel Tool</span>
      </nav>

      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input />
          <input />
          <input />
          <button>Search</button>
        </div>
      </div>

      {/* Response items go in this container */}
      <ul>
        <li className="offer-item">Result 1</li>
        <li className="offer-item">Result 2</li>
        <li className="offer-item">Result 3</li>
        <li className="offer-item">Result 4</li>
        <li className="offer-item">Result 5</li>
      </ul>
    </div>
  );
}

export default Frontend;
