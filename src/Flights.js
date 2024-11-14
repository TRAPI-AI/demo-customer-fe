// Import necessary libraries
import React, { useState } from "react";

// Define the Flights component
const Flights = () => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  // Function to handle the search button click
  const handleSearchClick = async () => {
    setLoading(true);
    try {
      // Collect input values
      const origin = document.querySelector(".origin").value;
      const destination = document.querySelector(".destination").value;
      const departureDate = document.querySelector(".departure-date").value;
      const passengerType = document.querySelector(".passenger-type").value;

      // Prepare request body
      const requestBody = {
        data: {
          slices: [
            {
              origin: origin,
              destination: destination,
              departure_date: departureDate,
            },
          ],
          passengers: [
            {
              type: passengerType,
            },
          ],
        },
      };

      // Make a POST request to the backend
      const response = await fetch("http://localhost:5000/duffel-flights-list-offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Parse the response
      const data = await response.json();
      setOffers(data.data.offers);
    } catch (error) {
      console.error("Error fetching flight offers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the select button click
  const handleSelectClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle the modal close button click
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input className="origin" placeholder="Origin" />
          <input className="destination" placeholder="Destination" />
          <input className="departure-date" type="date" />
          <select className="passenger-type">
            <option value="adult">Adult</option>
            <option value="child">Child</option>
          </select>
          <button className="search-button" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <ul>
        {offers.map((offer, index) => (
          <li key={index} className="offer-item">
            <p className="operator-name">{offer.slices[0].segments[0].operating_carrier.name}</p>
            <div>
              <p className="departing-at">{offer.slices[0].segments[0].departing_at}</p>
              <p className="origin-name">{offer.slices[0].origin.name}</p>
            </div>
            <p className="duration">{offer.slices[0].segments[0].duration}</p>
            <div>
              <p className="arriving-at">{offer.slices[0].segments[0].arriving_at}</p>
              <p className="destination-name">{offer.slices[0].destination.name}</p>
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
          <p className="total-emissions">Emissions: {offers[0]?.total_emissions_kg} kg</p>
          <p className="destination-type">Tax Amount: {offers[0]?.tax_amount} {offers[0]?.tax_currency}</p>
          <p className="corporate-code">Code: {offers[0]?.private_fares[0]?.corporate_code}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

// Export the Flights component
export default Flights;
