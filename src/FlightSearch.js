import React, { useState } from "react";
import axios from "axios";

const FlightSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offers, setOffers] = useState([]);

  const searchFlights = async () => {
    setLoading(true);
    setError(null);

    const requestData = {
      data: {
        slices: [
          {
            origin: "JFK",
            destination: "LAX",
            departure_date: "2023-12-01",
            departure_time: { from: "08:00", to: "12:00" },
            arrival_time: { from: "11:00", to: "15:00" },
          },
        ],
        private_fares: {
          QF: [{ corporate_code: "", tracking_reference: "" }],
          UA: [{ corporate_code: "", tour_code: "" }],
        },
        passengers: [
          {
            family_name: "Doe",
            given_name: "John",
            loyalty_programme_accounts: [
              { account_number: "123456", airline_iata_code: "UA" },
            ],
            type: "adult",
          },
          { age: 18, fare_type: "economy" },
        ],
        max_connections: 1,
        cabin_class: "economy",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/duffel-flights-list-offers",
        requestData
      );
      setOffers(response.data.data.offers);
    } catch (err) {
      setError("An error occurred while fetching flight offers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={searchFlights}>Search Flights</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {offers.map((offer, index) => (
          <li key={index}>
            <p>{offer.slices[0].segments[0].marketing_carrier.name}</p>
            <p>{offer.slices[0].segments[0].departing_at}</p>
            <p>{offer.slices[0].segments[0].origin.name}</p>
            <p>{offer.slices[0].segments[0].arriving_at}</p>
            <p>{offer.slices[0].segments[0].destination.name}</p>
            <p>{offer.total_amount} {offer.total_currency}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightSearch;