// Integrating the frontend with the backend for location data, vehicle availability, and booking creation

import React, { useState, useEffect } from "react";
import axios from "axios";

const CarRentals = () => {
  const [BookingDetails, setBookingDetails] = useState(false);
  const [BookingSuccess, setBookingSuccess] = useState(false);
  const [locations, setLocations] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    fromLocation: "",
    toLocation: "",
    dateFrom: "",
    dateTo: "",
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
          from_location: searchParams.fromLocation.toLowerCase(),
          to_location: searchParams.toLocation.toLowerCase(),
          checkin_date: searchParams.dateFrom,
          checkout_date: searchParams.dateTo,
        },
      });
      setAvailabilities(response.data.data);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      const selectedAvailability = availabilities[0]; // Assuming the first availability is selected
      const bookingData = {
        checkin_date: searchParams.dateFrom,
        checkout_date: searchParams.dateTo,
        client: clientDetails,
        code: "ID-12345",
        distance_package: selectedAvailability.distance_package.identifier,
        from_location: searchParams.fromLocation,
        insurance: selectedAvailability.insurance.identifier,
        passengers: 2,
        to_location: searchParams.toLocation,
        vehicle: selectedAvailability.vehicle.identifier,
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
          <select
            className="origin"
            value={searchParams.fromLocation}
            onChange={(e) => setSearchParams({ ...searchParams, fromLocation: e.target.value })}
          >
            <option value="">Select Origin</option>
            {locations.map((location) => (
              <option key={location.identifier} value={location.identifier}>
                {location.name}
              </option>
            ))}
          </select>
          <select
            className="destination"
            value={searchParams.toLocation}
            onChange={(e) => setSearchParams({ ...searchParams, toLocation: e.target.value })}
          >
            <option value="">Select Destination</option>
            {locations.map((location) => (
              <option key={location.identifier} value={location.identifier}>
                {location.name}
              </option>
            ))}
          </select>
          <input
            className="date-from"
            type="date"
            value={searchParams.dateFrom}
            onChange={(e) => setSearchParams({ ...searchParams, dateFrom: e.target.value })}
          />
          <input
            className="date-to"
            type="date"
            value={searchParams.dateTo}
            onChange={(e) => setSearchParams({ ...searchParams, dateTo: e.target.value })}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <ul>
        {availabilities.map((availability) => (
          <li key={availability.vehicle.identifier} className="search-response-item">
            <img
              alt="Vehicle"
              className="vehicle-image"
              src={availability.vehicle.images[0]}
            />
            <div>
              <p className="status">Status: {availability.availability.status}</p>
              <p className="capacity">Capacity: {availability.vehicle.max_capacity}</p>
              <p className="beds">Beds: {availability.vehicle.total_beds}</p>
              <p className="price-per-day">Price-per-day: {availability.price.cost_per_day} {availability.price.currency}</p>
              <p className="total-price">
                Total price: <span className="currency">{availability.price.total_cost} {availability.price.currency}</span>
              </p>
            </div>
            <button className="select-button" onClick={() => setBookingDetails(true)}>Select</button>
          </li>
        ))}
      </ul>
      {BookingDetails && (
        <div className="booking-form">
          <h3>Enter Client Details</h3>
          <input
            placeholder="Name"
            value={clientDetails.name}
            onChange={(e) => setClientDetails({ ...clientDetails, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={clientDetails.email}
            onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
          />
          <input
            placeholder="Nationality"
            value={clientDetails.nationality}
            onChange={(e) => setClientDetails({ ...clientDetails, nationality: e.target.value })}
          />
          <input
            placeholder="Phone Number"
            value={clientDetails.phone_number}
            onChange={(e) => setClientDetails({ ...clientDetails, phone_number: e.target.value })}
          />
          <button onClick={handleBooking}>Book</button>
        </div>
      )}
      {BookingSuccess && (
        <div className="booking-confirmation">
          <h3>Booking Confirmation</h3>
          <p className="from-location">from: {searchParams.fromLocation}</p>
          <p className="to-location">to: {searchParams.toLocation}</p>
          <p className="capacity">Capacity: {availabilities[0]?.vehicle.max_capacity}</p>
          <p className="type">Type: {availabilities[0]?.vehicle.type}</p>
        </div>
      )}
    </div>
  );
};

export default CarRentals;

// End of integration
