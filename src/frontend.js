import React from "react";
import Inspiration from "./inspiration";
import Navbar from "./navbar";
import "./App.css";

function Frontend() {
  return (
    <div>
      <Navbar />

        {/* Replace with travel vertical type */}
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
      <Inspiration />
    </div>
  );
}

export default Frontend;
