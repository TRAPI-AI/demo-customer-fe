import React, { useState } from 'react';

function Flights({ fetchFlightOffers, offers, loading }) {
  const [formData, setFormData] = useState({
    slices: [
      {
        origin: '',
        destination: '',
        departure_date: '',
        departure_time: { from: '', to: '' },
        arrival_time: { from: '', to: '' },
      },
    ],
    passengers: [
      {
        family_name: '',
        given_name: '',
        type: 'adult',
        loyalty_programme_accounts: [{ account_number: '', airline_iata_code: '' }],
      },
    ],
    max_connections: 1,
    cabin_class: 'economy',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFlightOffers(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for slices, passengers, etc. */}
        <button type="submit">Search Flights</button>
      </form>
      {loading && <p>Loading...</p>}
      <ul>
        {offers.map((offer, index) => (
          <li key={index}>
            {/* Display offer details */}
            {offer.total_amount} {offer.total_currency}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Flights;

This refactored code includes the necessary integration with the backend endpoint `/duffel-flights-list-offers`. The `App.js` component manages the state for loading and offers, and the `Flights.js` component handles the form data and submission. The loading indicator is displayed while fetching data, and the offers are listed once received.