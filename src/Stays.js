import React, { useState } from 'react';

const Stays = () => {
  const [rooms, setRooms] = useState('');
  const [radius, setRadius] = useState('5');
  const [longitude, setLongitude] = useState('-0.1416');
  const [latitude, setLatitude] = useState('51.5071');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState([{ type: 'adult' }, { type: 'adult' }]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    const payload = {
      rooms: parseInt(rooms, 10),
      location: {
        radius: parseInt(radius, 10),
        geographic_coordinates: {
          longitude: parseFloat(longitude),
          latitude: parseFloat(latitude),
        },
      },
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      guests: guests,
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-stays-search-for-accommodation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setResults(data.data.results);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <label>
            Rooms:
            <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} />
          </label>
          <label>
            Radius:
            <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} />
          </label>
          <label>
            Longitude:
            <input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          </label>
          <label>
            Latitude:
            <input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          </label>
          <label>
            Check-in Date:
            <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
          </label>
          <label>
            Check-out Date:
            <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
          </label>
          <label>
            Guests:
            <select onChange={(e) => setGuests([{ type: e.target.value }, { type: e.target.value }])}>
              <option value="adult">Adult</option>
              <option value="child">Child</option>
            </select>
          </label>
          <button onClick={handleSearch}>Search</button>
          {loading && <div>Loading...</div>}
        </div>
      </div>
      <div className="results-area">
        {results.map((result, index) => (
          <div key={index} className="result-card">
            <p>Cheapest Rate Total Amount: {result.cheapest_rate_total_amount}</p>
            <p>Cheapest Rate Currency: {result.cheapest_rate_currency}</p>
            <p>Check-in Date: {result.check_in_date}</p>
            <p>Check-out Date: {result.check_out_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stays;
