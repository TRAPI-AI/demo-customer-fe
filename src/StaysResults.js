import React, { useState } from "react";

const StaysResults = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Response items go in this container */}
      <ul>
        <li className="offer-item">
          <p className="destination">destination</p>
          <div>
            <p className="zone">zone</p>
            <p className="discount">discount</p>
          </div>
          <p className="rate-class">rate class</p>
          <div>
            <p className="category">category</p>
            <p className="board-name">board name</p>
          </div>
          <div>
            <p className="rate">rate</p>
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

export default StaysResults;
