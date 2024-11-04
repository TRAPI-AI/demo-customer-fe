// Integrating the travel API with the frontend code

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
    dateTo: ''
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
          checkout_date: searchParams.dateTo
        }
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
            list="location-options"
            value={searchParams.origin}
            onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
          />
          <input
            className="destination"
            placeholder="Destination"
            list="location-options"
            value={searchParams.destination}
            onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
          />
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
          {availabilities.map((availability, index) => (
            <li key={index} className="search-response-item">
              <p className="status">{availability.vehicle.name}</p>
              <p className="capacity">{availability.vehicle.max_capacity}</p>
              <p className="beds">{availability.vehicle.total_beds}</p>
              <p className="price-per-day">{availability.price.cost_per_day} {availability.price.currency}</p>
              <p className="total-price">
                Total Price <span className="currency">{availability.price.total_cost} {availability.price.currency}</span>
              </p>
              <button className="select-button">Select</button>
            </li>
          ))}
        </ul>
      )}
      <datalist id="location-options">
        {locations.map((location, index) => (
          <option key={index} value={location.name} />
        ))}
      </datalist>
    </div>
  );
};

export default CarRentals;

// End of integration
