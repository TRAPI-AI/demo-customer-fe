// Integrating the travel API with the frontend code

import React, { useState, useEffect } from "react";
import axios from "axios";

const CarRentals = () => {
  const [OffersList, setOffersList] = useState(false);
  const [OfferInfo, setOfferInfo] = useState(false);
  const [BookingDetails, setBookingDetails] = useState(false);
  const [BookingSuccess, setBookingSuccess] = useState(false);
  const [locations, setLocations] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/indie-campers-list-locations");
        setLocations(response.data.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const origin = document.querySelector(".origin").value.toLowerCase();
      const destination = document.querySelector(".destination").value.toLowerCase();
      const dateFrom = document.querySelector(".date-from").value;
      const dateTo = document.querySelector(".date-to").value;

      const response = await axios.get(`http://localhost:5000/indie-campers-list-availabilities?from_location=${origin}&to_location=${destination}&checkin_date=${dateFrom}&checkout_date=${dateTo}`);
      setOffers(response.data.data);
      setOffersList(true);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input className="origin" placeholder="Origin" list="origin-list" />
          <datalist id="origin-list">
            {locations.map((location) => (
              <option key={location.identifier} value={location.name} />
            ))}
          </datalist>
          <input className="destination" placeholder="Destination" list="destination-list" />
          <datalist id="destination-list">
            {locations.map((location) => (
              <option key={location.identifier} value={location.name} />
            ))}
          </datalist>
          <input className="date-from" type="date" />
          <input className="date-to" type="date" />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {OffersList && (
        <ul>
          {offers.map((offer) => (
            <li key={offer.vehicle.identifier} className="search-response-item">
              <img alt="Vehicle" className="vehicle-image" src={offer.vehicle.images[0]} />
              <div>
                <p className="status">{offer.availability.status}</p>
                <p className="capacity">Capacity: {offer.vehicle.max_capacity}</p>
                <p className="beds">Beds: {offer.vehicle.total_beds}</p>
                <p className="price-per-day">Price-per-day: {offer.price.cost_per_day} {offer.price.currency}</p>
                <p className="total-price">
                  Total price: <span className="currency">{offer.price.total_cost} {offer.price.currency}</span>
                </p>
              </div>
              <button className="select-button" onClick={() => setOfferInfo(offer)}>Select</button>
            </li>
          ))}
        </ul>
      )}
      {OfferInfo && (
        <div className="offer-information">
          <h3>Offer Information</h3>
          <p className="price">Price: {OfferInfo.price.total_cost} {OfferInfo.price.currency}</p>
          <p className="insurance">Insurance info: {OfferInfo.insurance.name}</p>
          <p className="identifier">ID: {OfferInfo.vehicle.identifier}</p>
          <p className="distance-package-name">Distance Package: {OfferInfo.distance_package.name}</p>
          <p className="type">Type: {OfferInfo.vehicle.type}</p>
          <button onClick={() => setBookingDetails(true)}>Select Offer</button>
        </div>
      )}
      {BookingDetails && (
        <div className="booking-form">
          <h3>Enter Client Details</h3>
          <input placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input placeholder="Nationality" />
          <input placeholder="Phone Number" />
          <button onClick={() => setBookingSuccess(true)}>Book</button>
        </div>
      )}
      {BookingSuccess && (
        <div className="booking-confirmation">
          <h3>Booking Confirmation</h3>
          <p className="from-location">from: {OfferInfo.from_location}</p>
          <p className="to-location">to: {OfferInfo.to_location}</p>
          <p className="capacity">Capacity: {OfferInfo.vehicle.max_capacity}</p>
          <p className="type">Type: {OfferInfo.vehicle.type}</p>
        </div>
      )}
    </div>
  );
};

export default CarRentals;
// End of integration
