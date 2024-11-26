import React from 'react';

const FlightResults = ({ offers }) => {
  return (
    <div>
      {offers.map((offer) => (
        <div key={offer.id}>
          <h3>Offer ID: {offer.id}</h3>
          <p>Total Amount: {offer.total_amount} {offer.total_currency}</p>
          <p>Base Amount: {offer.base_amount} {offer.base_currency}</p>
          <p>Tax Amount: {offer.tax_amount} {offer.tax_currency}</p>
          <p>Total Emissions: {offer.total_emissions_kg} kg</p>
          {/* Additional offer details can be displayed here */}
        </div>
      ))}
    </div>
  );
};

export default FlightResults;

// End of response

This refactored code for `FlightSearch.js` and `FlightResults.js` integrates the frontend with the backend API endpoint `/duffel-flights-list-offers`. The `FlightSearch` component handles user input and submits a request to the backend, while the `FlightResults` component displays the flight offers returned from the API. A loading indicator is shown while the request is being processed.