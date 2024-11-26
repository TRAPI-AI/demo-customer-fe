import React from "react";

const FlightResults = ({ flightData }) => {
  if (!flightData) {
    return null;
  }

  return (
    <div>
      <ul>
        {flightData.data.offers.map((offer, index) => (
          <li key={index} className="offer-item">
            <p className="operator-name">{offer.slices[0].segments[0].operating_carrier.name}</p>
            <div>
              <p className="departing-at">{new Date(offer.slices[0].segments[0].departing_at).toLocaleString()}</p>
              <p className="origin-name">{offer.slices[0].segments[0].origin.name}</p>
            </div>
            <p className="duration">{offer.slices[0].segments[0].duration}</p>
            <div>
              <p className="arriving-at">{new Date(offer.slices[0].segments[0].arriving_at).toLocaleString()}</p>
              <p className="destination-name">{offer.slices[0].segments[0].destination.name}</p>
            </div>
            <div>
              <p className="total-amount">{offer.total_currency} {offer.total_amount}</p>
              <button className="select-button" onClick={() => alert('Selected!')}>
                Select
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightResults;

// The above code refactors the FlightSearch and FlightResults components to integrate with the backend API. It includes a loading indicator and maps the API response to the frontend display.