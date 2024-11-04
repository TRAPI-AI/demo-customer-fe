// Integrating the frontend with the backend for Indie Campers location and availability data

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarRentals = () => {
  const [locations, setLocations] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    dateFrom: '',
    dateTo: '',
  });

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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/indie-campers-list-availabilities', {
        params: {
          from_location: searchParams.origin.toLowerCase(),
          to_location: searchParams.destination.toLowerCase(),
          checkin_date: searchParams.dateFrom,
          checkout_date: searchParams.dateTo,
        },
      });
      setAvailabilities(response.data.data);
    } catch (error) {
      console.error('Error fetching availabilities:', error);
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
            list="origin-list"
            value={searchParams.origin}
            onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
          />
          <datalist id="origin-list">
            {locations.map((location) => (
              <option key={location.identifier} value={location.name} />
            ))}
          </datalist>
          <input
            className="destination"
            placeholder="Destination"
            list="destination-list"
            value={searchParams.destination}
            onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
          />
          <datalist id="destination-list">
            {locations.map((location) => (
              <option key={location.identifier} value={location.name} />
            ))}
          </datalist>
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {availabilities.map((availability) => (
            <li key={availability.vehicle.identifier} className="search-response-item">
              <img
                alt={availability.vehicle.name}
                className="vehicle-image"
                src={availability.vehicle.images[0]}
              />
              <div>
                <p className="status">{availability.availability.status}</p>
                <p className="capacity">{availability.vehicle.max_capacity}</p>
                <p className="beds">{availability.vehicle.total_beds}</p>
                <p className="price-per-day">{availability.price.cost_per_day}</p>
                <p className="total-price">
                  {availability.price.total_cost}
                  <span className="currency">{availability.price.currency}</span>
                </p>
              </div>
              <button className="select-button">Select</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarRentals;

// End of integration
