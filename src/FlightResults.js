import React, { useState } from "react";

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
      <ul>
        {flightOffers.map((offer) => (
          <li key={offer.id} className="offer-item">
            <p className="operator-name">{offer.slices[0].segments[0].operating_carrier.name}</p>
            <div>
              <p className="departing-at">{new Date(offer.slices[0].segments[0].departing_at).toLocaleString()}</p>
              <p className="origin-name">{offer.slices[0].origin.city_name}</p>
            </div>
            <p className="duration">{offer.slices[0].segments[0].duration}</p>
            <div>
              <p className="arriving-at">{new Date(offer.slices[0].segments[0].arriving_at).toLocaleString()}</p>
              <p className="destination-name">{offer.slices[0].destination.city_name}</p>
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
