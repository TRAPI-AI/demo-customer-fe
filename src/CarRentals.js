// Integrating the frontend with the backend for the CarRentals component

import React, { useState } from 'react';
import axios from 'axios';

const CarRentals = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/indie-campers-list-availabilities', {
        params: {
          from_location: origin.toLowerCase(),
          to_location: destination.toLowerCase(),
          checkin_date: dateFrom,
          checkout_date: dateTo,
        },
      });
      setVehicles(response.data.data);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
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
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <input
            className="destination"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            className="date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <input
            className="date-to"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <ul>
        {vehicles.map((vehicle, index) => (
          <li key={index} className="search-response-item">
            <img
              alt={vehicle.vehicle.name}
              className="vehicle-image"
              src={vehicle.vehicle.images[0]}
            />
            <div>
              <p className="status">{vehicle.availability.status}</p>
              <p className="capacity">Capacity: {vehicle.vehicle.max_capacity}</p>
              <p className="beds">Beds: {vehicle.vehicle.total_beds}</p>
              <p className="price-per-day">Price-per-day: {vehicle.price.cost_per_day} {vehicle.price.currency}</p>
              <p className="total-price">
                Total price: <span className="currency">{vehicle.price.total_cost} {vehicle.price.currency}</span>
              </p>
            </div>
            <button className="select-button">Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarRentals;
// End of integration
