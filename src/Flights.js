// Integrating the travel API with the frontend and backend

import React, { useState } from "react";
import axios from "axios";

const Flights = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelectClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    const origin = document.querySelector(".origin").value;
    const destination = document.querySelector(".destination").value;
    const departureDate = document.querySelector(".departure-date").value;
    const passengerType = document.querySelector(".passenger-type").value;

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
        max_connections: 1,
        cabin_class: "economy",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/duffel-flights-list-offers",
        requestBody
      );
      const offers = response.data.data.offers;
      setFlights(offers);
    } catch (error) {
      console.error("Error fetching flight offers:", error);
    } finally {
      setLoading(false);
    }
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
            <option value="infant">Infant</option>
          </select>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <ul>
        {flights.map((offer, index) => (
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
            <p className="duration">{offer.slices[0].segments[0].duration}</p>
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
          <p className="cabin-class">Cabin Class</p>
          <p className="time-zone">Time Zone</p>
          <p className="conditions-of-carriage">Conditions of Carriage</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Flights;

// End of integration
