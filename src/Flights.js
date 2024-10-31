import React, { useState } from "react";

const Flights = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      {/* Response items go in this container */}
      <ul>
        <li className="offer-item">
          <p className="operator-name">name</p>
          <div>
            <p className="departing-at">departing at</p>
            <p className="origin-name">origin name</p>
          </div>
          <p className="duration">duration</p>
          <div>
            <p className="arriving-at">arriving at</p>
            <p className="destination-name">destination name</p>
          </div>
          <div>
            <p className="total-amount">amount</p>
            <button className="select-button" onClick={handleSelectClick}>
              Select
            </button>
          </div>
        </li>
      </ul>
      {isModalOpen && (
        <div className="select-modal">
          <p className="total-emissions">Emissions</p>
          <p className="destination-type">Tax Amount</p>
          <p className="corporate-code">Code</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Flights;
