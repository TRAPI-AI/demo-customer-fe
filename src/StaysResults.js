import React, { useState } from "react";

const StaysResults = ({ offers }) => {
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
            <p className="destination">{offer.destination.city_name}</p>
            <div>
              <p className="zone">{offer.destination_type}</p>
              <p className="discount">{offer.conditions.change_before_departure.penalty_amount}</p>
            </div>
            <p className="rate-class">{offer.slices[0].fare_brand_name}</p>
            <div>
              <p className="category">{offer.slices[0].segments[0].cabin_class}</p>
              <p className="board-name">{offer.slices[0].segments[0].marketing_carrier.name}</p>
            </div>
            <div>
              <p className="rate">{offer.total_amount}</p>
              <button className="select-button" onClick={handleSelectClick}>
                Select
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className="select-modal">
          <p className="total-emissions">Emissions: {offers[0].total_emissions_kg}</p>
          <p className="destination-type">Tax Amount: {offers[0].tax_amount}</p>
          <p className="corporate-code">Code: {offers[0].id}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default StaysResults;