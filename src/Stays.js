import React, { useState } from 'react';

const Stays = () => {
  const [rooms, setRooms] = useState(1);
  const [radius, setRadius] = useState(5);
  const [longitude, setLongitude] = useState(-0.1416);
  const [latitude, setLatitude] = useState(51.5071);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState([{ type: 'adult' }, { type: 'adult' }]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    const payload = {
      rooms,
      location: {
        radius,
        geographic_coordinates: {
          longitude,
          latitude,
        },
      },
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      guests,
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
          <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(parseInt(e.target.value))}
            placeholder="Rooms"
          />
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            placeholder="Radius"
          />
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
            placeholder="Longitude"
          />
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
            placeholder="Latitude"
          />
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            placeholder="Check-in Date"
          />
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            placeholder="Check-out Date"
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      <ul>
        {results.map((result) => (
          <li key={result.id} className="offer-item">
            <div>
              <p>Check-in Date: {result.check_in_date}</p>
              <p>Check-out Date: {result.check_out_date}</p>
              <p>Cheapest Rate: {result.cheapest_rate_total_amount} {result.cheapest_rate_currency}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stays;
