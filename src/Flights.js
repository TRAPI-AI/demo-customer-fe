import React, { useState } from 'react';

const Flights = () => {
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [departureDateTime, setDepartureDateTime] = useState('');
  const [arrivalDateTime, setArrivalDateTime] = useState('');
  const [codeType, setCodeType] = useState('IATA');
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:5000/oag-flight-info-v2?DepartureAirport=${departureAirport}&ArrivalAirport=${arrivalAirport}&DepartureDateTime=${departureDateTime}&ArrivalDateTime=${arrivalDateTime}&CodeType=${codeType}`, {
      method: 'GET',
    });
    const data = await response.json();
    setLoading(false);
    setFlights(data.data);
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input
            type="text"
            placeholder="Departure Airport"
            value={departureAirport}
            onChange={(e) => setDepartureAirport(e.target.value)}
          />
          <input
            type="text"
            placeholder="Arrival Airport"
            value={arrivalAirport}
            onChange={(e) => setArrivalAirport(e.target.value)}
          />
          <input
            type="date"
            placeholder="Departure Date"
            value={departureDateTime}
            onChange={(e) => setDepartureDateTime(e.target.value)}
          />
          <input
            type="date"
            placeholder="Arrival Date"
            value={arrivalDateTime}
            onChange={(e) => setArrivalDateTime(e.target.value)}
          />
          <select
            value={codeType}
            onChange={(e) => setCodeType(e.target.value)}
          >
            <option value="IATA">IATA</option>
            <option value="ICAO">ICAO</option>
            <option value="FAA">FAA</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {loading && <div>Loading...</div>}
      <ul>
        {flights.map((flight, index) => (
          <li key={index} className="offer-item">
            <div>Carrier IATA: {flight.carrier.iata}</div>
            <div>Flight Number: {flight.flightNumber}</div>
            <div>Departure Airport IATA: {flight.departure.airport.iata}</div>
            <div>Departure Date UTC: {flight.departure.date.utc}</div>
            <div>Departure Time UTC: {flight.departure.time.utc}</div>
            <div>Arrival Airport IATA: {flight.arrival.airport.iata}</div>
            <div>Arrival Date UTC: {flight.arrival.date.utc}</div>
            <div>Arrival Time UTC: {flight.arrival.time.utc}</div>
            <div>Elapsed Time: {flight.elapsedTime}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
