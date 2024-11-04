// Integrating the frontend with the backend for location data

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarRentals = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/indie-campers-list-locations');
        setLocations(response.data.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input className="origin" placeholder="Origin" list="location-options" />
          <input className="destination" placeholder="Destination" list="location-options" />
          <input className="date-from" type="date" />
          <input className="date-to" type="date" />
          <button>Search</button>
        </div>
      </div>
      {loading && <p>Loading locations...</p>}
      <datalist id="location-options">
        {locations.map((location) => (
          <option key={location.identifier} value={location.name}>
            {location.name}, {location.country_code}
          </option>
        ))}
      </datalist>
      <ul>
        <li className="search-response-item">
          <img alt="Placeholder Image" className="vehicle-image" />
          <div>
            <p className="status"></p>
            <p className="capacity">Capacity: </p>
            <p className="beds">Beds:</p>
            <p className="price-per-day">Price-per-day:</p>
            <p className="total-price">
              Total price: <span className="currency"></span>
            </p>
          </div>
          <button className="select-button">Select</button>
        </li>
      </ul>
      <div className="booking-form">
        <h3>Enter Client Details</h3>
        <input placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input placeholder="Nationality" />
        <input placeholder="Phone Number" />
        <button>Book</button>
      </div>
      <div className="booking-confirmation">
        <h3>Booking Confirmation</h3>
        <p className="from-location">from:</p>
        <p className="to-location">to:</p>
        <p className="capacity">Capacity:</p>
        <p className="type">Type:</p>
      </div>
    </div>
  );
};

export default CarRentals;
// End of integration
