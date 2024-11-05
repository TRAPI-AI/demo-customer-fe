// Integrating the new endpoint with the frontend code

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
  const [searchParams, setSearchParams] = useState({
    from_location: "",
    to_location: "",
    checkin_date: "",
    checkout_date: "",
  });

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
      const response = await axios.get("http://localhost:5000/indie-campers-list-availabilities", {
        params: {
          from_location: searchParams.from_location.toLowerCase(),
          to_location: searchParams.to_location.toLowerCase(),
          checkin_date: searchParams.checkin_date,
          checkout_date: searchParams.checkout_date,
        },
      });
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
          <input
            className="origin"
            placeholder="Origin"
            list="locations"
            onChange={(e) => setSearchParams({ ...searchParams, from_location: e.target.value })}
          />
          <input
            className="destination"
            placeholder="Destination"
            list="locations"
            onChange={(e) => setSearchParams({ ...searchParams, to_location: e.target.value })}
          />
          <datalist id="locations">
            {locations.map((location) => (
              <option key={location.identifier} value={location.name}>
                {location.address}, {location.country_code}
              </option>
            ))}
          </datalist>
          <input
            className="date-from"
            type="date"
            onChange={(e) => setSearchParams({ ...searchParams, checkin_date: e.target.value })}
          />
          <input
            className="date-to"
            type="date"
            onChange={(e) => setSearchParams({ ...searchParams, checkout_date: e.target.value })}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
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
          <p className="from-location">from: {searchParams.from_location}</p>
          <p className="to-location">to: {searchParams.to_location}</p>
          <p className="capacity">Capacity: {OfferInfo.vehicle.max_capacity}</p>
          <p className="type">Type: {OfferInfo.vehicle.type}</p>
        </div>
      )}
    </div>
  );
};

export default CarRentals;
// End of integration
