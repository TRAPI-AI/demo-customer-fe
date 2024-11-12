// Import necessary libraries
import React, { useState } from "react";
import axios from "axios";

const Flights = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    passengerType: "adult",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchClick = async () => {
    setLoading(true);
    try {
      const requestBody = {
        data: {
          slices: [
            {
              origin: formData.origin,
              destination: formData.destination,
              departure_date: formData.departureDate,
            },
          ],
          passengers: [
            {
              type: formData.passengerType,
            },
          ],
        },
      };

      const response = await axios.post(
        "http://localhost:5000/duffel-flights-list-offers",
        requestBody
      );

      setOffers(response.data.data.offers);
    } catch (error) {
      console.error("Error fetching flight offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input
            className="origin"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
            placeholder="Origin"
          />
          <input
            className="destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="Destination"
          />
          <input
            className="departure-date"
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleInputChange}
          />
          <select
            className="passenger-type"
            name="passengerType"
            value={formData.passengerType}
            onChange={handleInputChange}
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant">Infant</option>
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
            <p className="operator-name">
              {offer.slices[0].segments[0].operating_carrier.name}
            </p>
            <div>
              <p className="departing-at">
                {new Date(
                  offer.slices[0].segments[0].departing_at
                ).toLocaleString()}
              </p>
              <p className="origin-name">
                {offer.slices[0].segments[0].origin.name}
              </p>
            </div>
            <p className="duration">{offer.slices[0].duration}</p>
            <div>
              <p className="arriving-at">
                {new Date(
                  offer.slices[0].segments[0].arriving_at
                ).toLocaleString()}
              </p>
              <p className="destination-name">
                {offer.slices[0].segments[0].destination.name}
              </p>
            </div>
            <div>
              <p className="total-amount">
                {offer.total_currency} {offer.total_amount}
              </p>
              <button className="select-button" onClick={handleSelectClick}>
                Select
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className="select-modal">
          <p className="total-emissions">
            Emissions: {offers[0]?.total_emissions_kg} kg
          </p>
          <p className="destination-type">
            Tax Amount: {offers[0]?.tax_currency} {offers[0]?.tax_amount}
          </p>
          <p className="corporate-code">
            Corporate Code: {offers[0]?.private_fares[0]?.corporate_code}
          </p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Flights;
