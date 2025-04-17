import React, { useState } from 'react';
import axios from 'axios';

const DuffelFlightsForm = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureTimeFrom: '',
    departureTimeTo: '',
    departureDate: '',
    arrivalTimeFrom: '',
    arrivalTimeTo: '',
    cabinClass: 'economy',
    passengers: [{
      familyName: '',
      givenName: '',
      type: 'adult',
      age: 18,
      loyaltyProgrammeAccounts: [{
        accountNumber: '',
        airlineIataCode: ''
      }]
    }],
    maxConnections: 1
  });

  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/duffel-flights/list-offers', { data: formData });
      setResponse(res.data);
    } catch (err) {
      setError(err.response ? err.response.data : 'Error connecting to the server');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="origin" value={formData.origin} onChange={handleChange} placeholder="Origin" required />
        <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination" required />
        <input type="time" name="departureTimeFrom" value={formData.departureTimeFrom} onChange={handleChange} placeholder="Departure Time From" />
        <input type="time" name="departureTimeTo" value={formData.departureTimeTo} onChange={handleChange} placeholder="Departure Time To" />
        <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} placeholder="Departure Date" required />
        <input type="time" name="arrivalTimeFrom" value={formData.arrivalTimeFrom} onChange={handleChange} placeholder="Arrival Time From" />
        <input type="time" name="arrivalTimeTo" value={formData.arrivalTimeTo} onChange={handleChange} placeholder="Arrival Time To" />
        <select name="cabinClass" value={formData.cabinClass} onChange={handleChange}>
          <option value="economy">Economy</option>
          <option value="premium_economy">Premium Economy</option>
          <option value="business">Business</option>
          <option value="first">First</option>
        </select>
        <button type="submit">Search Flights</button>
      </form>
      {error && <div className="error">{error}</div>}
      {response && <div className="response">{JSON.stringify(response)}</div>}
    </div>
  );
};

export default DuffelFlightsForm;