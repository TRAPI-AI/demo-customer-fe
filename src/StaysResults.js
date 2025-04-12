import React, { useState } from "react";

const StaysResults = ({ results }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleSelectClick = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
  };

  return (
    <div>
      <ul>
        {results.map((hotel) => (
          hotel.rooms.map((room) => (
            room.rates.map((rate) => (
              <li key={rate.rateKey} className="offer-item">
                <p className="destination">{hotel.destinationName}</p>
                <div>
                  <p className="zone">{hotel.zoneName}</p>
                  <p className="discount">{rate.discount || "No discount"}</p>
                </div>
                <p className="rate-class">{rate.rateClass}</p>
                <div>
                  <p className="category">{hotel.categoryName}</p>
                  <p className="board-name">{rate.boardName}</p>
                </div>
                <div>
                  <p className="rate">{rate.sellingRate} {hotel.currency}</p>
                  <button className="select-button" onClick={() => handleSelectClick(rate)}>
                    Select
                  </button>
                </div>
              </li>
            ))
          ))
        ))}
      </ul>
      {isModalOpen && selectedOffer && (
        <div className="select-modal">
          <p className="total-emissions">Emissions: {selectedOffer.taxes.taxes[0].amount}</p>
          <p className="destination-type">Tax Amount: {selectedOffer.taxes.taxes[0].clientAmount}</p>
          <p className="corporate-code">Code: {selectedOffer.rateKey}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default StaysResults;
