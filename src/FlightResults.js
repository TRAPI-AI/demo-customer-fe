import React, { useState, useEffect } from "react";

const FlightResults = ({ results }) => {
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
        {results && results.hotels && results.hotels.hotels.map((hotel) => (
          <li key={hotel.code} className="offer-item">
            <p className="operator-name">{hotel.name}</p>
            <div>
              <p className="departing-at">Check-in: {hotel.checkIn}</p>
              <p className="origin-name">{hotel.destinationName}</p>
            </div>
            <p className="duration">Zone: {hotel.zoneName}</p>
            <div>
              <p className="arriving-at">Check-out: {hotel.checkOut}</p>
              <p className="destination-name">{hotel.destinationName}</p>
            </div>
            <div>
              <p className="total-amount">Min Rate: {hotel.minRate} {hotel.currency}</p>
              <button className="select-button" onClick={() => handleSelectClick(hotel)}>
                Select
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedOffer && (
        <div className="select-modal">
          <p className="total-emissions">Emissions: {selectedOffer.emissions}</p>
          <p className="destination-type">Tax Amount: {selectedOffer.taxes && selectedOffer.taxes.taxes[0].amount}</p>
          <p className="corporate-code">Code: {selectedOffer.code}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default FlightResults;
