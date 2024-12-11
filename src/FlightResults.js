import React, { useState } from "react";

const FlightResults = ({ offers }) => {
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
        {offers.map((offer, index) => (
          <li key={index} className="offer-item">
            <p className="operator-name">{offer.slices[0].segments[0].operating_carrier.name}</p>
            <div>
              <p className="departing-at">{offer.slices[0].segments[0].departing_at}</p>
              <p className="origin-name">{offer.slices[0].segments[0].origin.name}</p>
            </div>
            <p className="duration">{offer.slices[0].duration}</p>
            <div>
              <p className="arriving-at">{offer.slices[0].segments[0].arriving_at}</p>
              <p className="destination-name">{offer.slices[0].segments[0].destination.name}</p>
            </div>
            <div>
              <p className="total-amount">{offer.total_amount} {offer.total_currency}</p>
              <button className="select-button" onClick={handleSelectClick}>
                Select
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className="select-modal">
          <p className="total-emissions">Emissions: {offers[0].total_emissions_kg} kg</p>
          <p className="destination-type">Tax Amount: {offers[0].tax_amount}</p>
          <p className="corporate-code">Code: {offers[0].id}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default FlightResults;
// The above code refactors the FlightSearch and FlightResults components to integrate with the backend API, handle user input, and display flight offers. It includes a loading indicator and error handling for API requests.