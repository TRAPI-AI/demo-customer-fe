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
  const [clientDetails, setClientDetails] = useState({
    name: "",
    email: "",
    nationality: "",
    phone_number: "",
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

  const handleSelectOffer = async (offer) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/indie-campers-get-availability", {
        params: {
          from_location: searchParams.from_location.toLowerCase(),
          to_location: searchParams.to_location.toLowerCase(),
          vehicle_identifier: offer.vehicle.identifier.toLowerCase(),
          checkin_date: searchParams.checkin_date,
          checkout_date: searchParams.checkout_date,
        },
      });
      setOfferInfo(response.data.data);
    } catch (error) {
      console.error("Error fetching offer details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      const bookingData = {
        checkin_date: searchParams.checkin_date,
        checkout_date: searchParams.checkout_date,
        client: clientDetails,
        code: "ID-12345",
        distance_package: OfferInfo.distance_package.identifier,
        from_location: searchParams.from_location,
        insurance: OfferInfo.insurance.identifier,
        passengers: 2,
        to_location: searchParams.to_location,
        vehicle: OfferInfo.vehicle.identifier,
      };

      const response = await axios.post("http://localhost:5000/indie-campers-create-a-booking", bookingData);
      setBookingSuccess(true);
    } catch (error) {
      console.error("Error creating booking:", error);
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
                <p className="status">Status: {offer.availability.status}</p>
                <p className="capacity">Capacity: {offer.vehicle.max_capacity}</p>
                <p className="beds">Beds: {offer.vehicle.total_beds}</p>
                <p className="price-per-day">Price-per-day: {offer.price.cost_per_day} {offer.price.currency}</p>
                <p className="total-price">
                  Total price: <span className="currency">{offer.price.total_cost} {offer.price.currency}</span>
                </p>
              </div>
              <button className="select-button" onClick={() => handleSelectOffer(offer)}>Select</button>
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
          <input placeholder="Name" onChange={(e) => setClientDetails({ ...clientDetails, name: e.target.value })} />
          <input type="email" placeholder="Email" onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })} />
          <input placeholder="Nationality" onChange={(e) => setClientDetails({ ...clientDetails, nationality: e.target.value })} />
          <input placeholder="Phone Number" onChange={(e) => setClientDetails({ ...clientDetails, phone_number: e.target.value })} />
          <button onClick={handleBooking}>Book</button>
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
