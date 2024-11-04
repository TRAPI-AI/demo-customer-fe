// Integrating the travel API with the frontend code

import React, { useState, useEffect } from "react";

const CarRentals = () => {
  const [BookingDetails, setBookingDetails] = useState(false);
  const [BookingSuccess, setBookingSuccess] = useState(false);
  const [locations, setLocations] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/indie-campers-list-locations');
        const data = await response.json();
        setLocations(data.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const fetchAvailabilities = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/indie-campers-list-availabilities/${origin.toLowerCase()}/${destination.toLowerCase()}?checkin_date=${dateFrom}&checkout_date=${dateTo}`);
      const data = await response.json();
      setAvailabilities(data.data);
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
          <input className="origin" placeholder="Origin" list="origin-list" value={origin} onChange={(e) => setOrigin(e.target.value)} />
          <datalist id="origin-list">
            {locations.map((location) => (
              <option key={location.identifier} value={location.name} />
            ))}
          </datalist>
          <input className="destination" placeholder="Destination" list="destination-list" value={destination} onChange={(e) => setDestination(e.target.value)} />
          <datalist id="destination-list">
            {locations.map((location) => (
              <option key={location.identifier} value={location.name} />
            ))}
          </datalist>
          <input className="date-from" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          <input className="date-to" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          <button onClick={fetchAvailabilities}>Search</button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <ul>
        {availabilities.map((availability) => (
          <li key={availability.vehicle.identifier} className="search-response-item">
            <img alt="Vehicle" className="vehicle-image" src={availability.vehicle.images[0]} />
            <div>
              <p className="status">{availability.availability.status}</p>
              <p className="distance-package-name">{availability.distance_package.name}</p>
              <p className="insurance-name">Insurance: {availability.insurance.name}</p>
              <p className="capacity">Capacity: {availability.vehicle.max_capacity}</p>
              <p className="beds">Beds: {availability.vehicle.total_beds}</p>
              <p className="price-per-day">Price-per-day: {availability.price.cost_per_day} {availability.price.currency}</p>
              <p className="total-price">
                Total price: {availability.price.total_cost} <span className="currency">{availability.price.currency}</span>
              </p>
            </div>
            <button className="select-button" onClick={() => setBookingDetails(true)}>Select</button>
          </li>
        ))}
      </ul>
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
          <p className="from-location">from: {origin}</p>
          <p className="to-location">to: {destination}</p>
          <p className="capacity">Capacity: {/* Map capacity from selected vehicle */}</p>
          <p className="type">Type: {/* Map type from selected vehicle */}</p>
        </div>
      )}
    </div>
  );
};

export default CarRentals;

// End of integration
