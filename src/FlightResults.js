import React, { useState } from "react";

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

  if (!results) return null;
  if (results.length === 0) return <div>No flights found.</div>;

  return (
    <div>
      {/* Response items go in this container */}
      <ul>
        {results.map((offer) => {
          // Defensive: get first slice and first segment for display
          const slice = offer.slices?.[0] || {};
          const segment = slice.segments?.[0] || {};
          const operator = segment.operating_carrier || {};
          const origin = segment.origin || {};
          const destination = segment.destination || {};
          return (
            <li className="offer-item" key={offer.id}>
              <p className="operator-name">{operator.name || 'Unknown Airline'}</p>
              <div>
                <p className="departing-at">{segment.departing_at ? new Date(segment.departing_at).toLocaleString() : 'N/A'}</p>
                <p className="origin-name">{origin.city_name || origin.iata_code || 'N/A'}</p>
              </div>
              <p className="duration">{slice.duration || 'N/A'}</p>
              <div>
                <p className="arriving-at">{segment.arriving_at ? new Date(segment.arriving_at).toLocaleString() : 'N/A'}</p>
                <p className="destination-name">{destination.city_name || destination.iata_code || 'N/A'}</p>
              </div>
              <div>
                <p className="total-amount">{offer.total_amount} {offer.total_currency}</p>
                <button className="select-button" onClick={() => handleSelectClick(offer)}>
                  Select
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {isModalOpen && selectedOffer && (
        <div className="select-modal" style={{ background: '#fff', border: '1px solid #ccc', padding: 16, position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, 0)', zIndex: 1000 }}>
          <h3>Offer Details</h3>
          <p className="total-emissions">Emissions: {selectedOffer.total_emissions_kg || 'N/A'} kg</p>
          <p className="destination-type">Tax Amount: {selectedOffer.tax_amount} {selectedOffer.tax_currency}</p>
          <p className="corporate-code">Offer ID: {selectedOffer.id}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default FlightResults;
