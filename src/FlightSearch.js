import React, { useState } from 'react';
import axios from 'axios';

const FlightSearch = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    departureTimeFrom: '',
    departureTimeTo: '',
    arrivalTimeFrom: '',
    arrivalTimeTo: '',
    passengers: [{ familyName: '', givenName: '', type: '', age: 18, fareType: '' }],
    cabinClass: 'economy',
    maxConnections: 1,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/duffel-flights-list-offers', {
        data: {
          slices: [
            {
              origin: formData.origin,
              destination: formData.destination,
              departure_date: formData.departureDate,
              departure_time: { from: formData.departureTimeFrom, to: formData.departureTimeTo },
              arrival_time: { from: formData.arrivalTimeFrom, to: formData.arrivalTimeTo },
            },
          ],
          passengers: formData.passengers,
          max_connections: formData.maxConnections,
          cabin_class: formData.cabinClass,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields for origin, destination, dates, times, passengers, etc. */}
        <button type="submit">Search Flights</button>
      </form>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default FlightSearch;