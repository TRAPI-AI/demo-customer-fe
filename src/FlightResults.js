import React, { useState } from "react";

const FlightResults = ({ results, error }) => {
  const [modalOffer, setModalOffer] = useState(null);

  if (error) {
    return null; // Error is already shown in FlightSearch
  }

  if (!results || !results.data || !Array.isArray(results.data.offers)) {
    return null;
  }

  const offers = results.data.offers;

  if (offers.length === 0) {
    return <div style={{ marginTop: 16 }}>No flights found.</div>;
  }

  const handleSelectClick = (offer) => {
    setModalOffer(offer);
  };

  const handleCloseModal = () => {
    setModalOffer(null);
  };

  return (
    <div>
      {/* Response items go in this container */}
      <ul>
        {offers.map((offer) => {
          // Use first slice and first segment for summary display
          const slice = offer.slices && offer.slices[0];
          const segment = slice && slice.segments && slice.segments[0];
          const operator = segment && segment.operating_carrier;
          const marketing = segment && segment.marketing_carrier;
          return (
            <li className="offer-item" key={offer.id}>
              <p className="operator-name">{operator?.name || marketing?.name || 'Unknown Airline'}</p>
              <div>
                <p className="departing-at">{segment?.departing_at ? new Date(segment.departing_at).toLocaleString() : 'departing at'}</p>
                <p className="origin-name">{slice?.origin?.city_name || slice?.origin?.iata_code || 'origin'}</p>
              </div>
              <p className="duration">{slice?.duration || 'duration'}</p>
              <div>
                <p className="arriving-at">{segment?.arriving_at ? new Date(segment.arriving_at).toLocaleString() : 'arriving at'}</p>
                <p className="destination-name">{slice?.destination?.city_name || slice?.destination?.iata_code || 'destination'}</p>
              </div>
              <div>
                <p className="total-amount">{offer.total_amount ? `${offer.total_amount} ${offer.total_currency}` : 'amount'}</p>
                <button className="select-button" onClick={() => handleSelectClick(offer)}>
                  Select
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {modalOffer && (
        <div className="select-modal" style={{ background: '#fff', border: '1px solid #ccc', padding: 16, position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, 0)', zIndex: 1000 }}>
          <p className="total-emissions"><strong>Emissions:</strong> {modalOffer.total_emissions_kg ? `${modalOffer.total_emissions_kg} kg` : 'N/A'}</p>
          <p className="destination-type"><strong>Tax Amount:</strong> {modalOffer.tax_amount ? `${modalOffer.tax_amount} ${modalOffer.tax_currency}` : 'N/A'}</p>
          <p className="corporate-code"><strong>Offer ID:</strong> {modalOffer.id}</p>
          <button onClick={handleCloseModal} style={{ marginTop: 8 }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default FlightResults;
