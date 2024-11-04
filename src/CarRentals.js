// Integrating the frontend with the backend for Indie Campers booking functionality

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarRentals = () => {
  const [locations, setLocations] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [clientData, setClientData] = useState({
    email: '',
    name: '',
    nationality: '',
    phone_number: ''
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

  const fetchAvailabilities = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/indie-campers-list-availabilities/${origin.toLowerCase()}/${destination.toLowerCase()}`, {
        params: {
          checkin_date: dateFrom,
          checkout_date: dateTo
        }
      });
      setAvailabilities(response.data.data);
    } catch (error) {
      console.error('Error fetching availabilities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedAvailability) return;

    const bookingData = {
      checkin_date: dateFrom,
      checkout_date: dateTo,
      client: clientData,
      code: selectedAvailability.code,
      distance_package: selectedAvailability.distance_package.identifier,
      from_location: origin,
      insurance: selectedAvailability.insurance.identifier,
      passengers: 2,
      to_location: destination,
      vehicle: selectedAvailability.vehicle.identifier
    };

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/indie-campers-create-a-booking', bookingData);
      console.log('Booking successful:', response.data);
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input className="origin" placeholder="Origin" list="location-options" onChange={(e) => setOrigin(e.target.value)} />
          <input className="destination" placeholder="Destination" list="location-options" onChange={(e) => setDestination(e.target.value)} />
          <input className="date-from" type="date" onChange={(e) => setDateFrom(e.target.value)} />
          <input className="date-to" type="date" onChange={(e) => setDateTo(e.target.value)} />
          <button onClick={fetchAvailabilities}>Search</button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <datalist id="location-options">
        {locations.map((location) => (
          <option key={location.identifier} value={location.name}>
            {location.name}, {location.country_code}
          </option>
        ))}
      </datalist>
      <ul>
        {availabilities.map((availability) => (
          <li key={availability.vehicle.identifier} className="search-response-item">
            <img alt="Vehicle" className="vehicle-image" src={availability.vehicle.images[0]} />
            <div>
              <p className="status">Status: {availability.availability.status}</p>
              <p className="capacity">Capacity: {availability.vehicle.max_capacity}</p>
              <p className="beds">Beds: {availability.vehicle.total_beds}</p>
              <p className="price-per-day">Price-per-day: {availability.price.cost_per_day} {availability.price.currency}</p>
              <p className="total-price">
                Total price: <span className="currency">{availability.price.total_cost} {availability.price.currency}</span>
              </p>
            </div>
            <button className="select-button" onClick={() => setSelectedAvailability(availability)}>Select</button>
          </li>
        ))}
      </ul>
      {selectedAvailability && (
        <div className="booking-form">
          <h3>Enter Client Details</h3>
          <input type="text" placeholder="Name" onChange={(e) => setClientData({ ...clientData, name: e.target.value })} />
          <input type="email" placeholder="Email" onChange={(e) => setClientData({ ...clientData, email: e.target.value })} />
          <input type="text" placeholder="Nationality" onChange={(e) => setClientData({ ...clientData, nationality: e.target.value })} />
          <input type="text" placeholder="Phone Number" onChange={(e) => setClientData({ ...clientData, phone_number: e.target.value })} />
          <button onClick={handleBooking}>Book Now</button>
        </div>
      )}
    </div>
  );
};

export default CarRentals;

// End of integration
