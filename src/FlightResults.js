import React, { useState, useEffect } from "react";

const FlightResults = ({ flightOffers }) => {
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
      {/* Response items go in this container */}
      <ul>
        {flightOffers.map((offer, index) => (
          <li key={index} className="offer-item">
            <p className="operator-name">{offer.operating_carrier.name}</p>
            <div>
              <p className="departing-at">{offer.departing_at}</p>
              <p className="origin-name">{offer.origin.name}</p>
            </div>
            <p className="duration">{offer.duration}</p>
            <div>
              <p className="arriving-at">{offer.arriving_at}</p>
              <p className="destination-name">{offer.destination.name}</p>
            </div>
            <div>
              <p className="total-amount">{offer.total_amount} {offer.total_currency}</p>
              <button className="select-button" onClick={() => handleSelectClick(offer)}>
                Select
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedOffer && (
        <div className="select-modal">
          <p className="total-emissions">Emissions: {selectedOffer.total_emissions_kg} kg</p>
          <p className="destination-type">Tax Amount: {selectedOffer.tax_amount} {selectedOffer.tax_currency}</p>
          <p className="corporate-code">Code: {selectedOffer.id}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default FlightResults;