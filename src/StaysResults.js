import React, { useState } from "react";

const StaysResults = ({ results }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ul>
        {results.map((hotel) => (
          <li key={hotel.code} className="offer-item">
            <p className="destination">{hotel.destinationName}</p>
            <div>
              <p className="zone">{hotel.zoneName}</p>
              <p className="discount">{hotel.rooms[0].rates[0].discount}</p>
            </div>
            <p className="rate-class">{hotel.rooms[0].rates[0].rateClass}</p>
            <div>
              <p className="category">{hotel.categoryName}</p>
              <p className="board-name">{hotel.rooms[0].rates[0].boardName}</p>
            </div>
            <div>
              <p className="rate">{hotel.rooms[0].rates[0].net}</p>
              <button className="select-button" onClick={handleSelectClick}>
                Select
              </button>
            </div>
          </li>
        ))}
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