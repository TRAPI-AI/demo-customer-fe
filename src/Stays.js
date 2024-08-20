import React, { useState } from 'react';

const Stays = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    const payload = {
      stay: {
        checkIn,
        checkOut,
      },
      occupancies: [
        {
          rooms,
          adults,
          children,
        },
      ],
      hotels: {
        hotel: [1533, 1803, 2587, 3219, 6930, 69995, 586091, 586234],
      },
    };

    try {
      const response = await fetch('http://localhost:5000/hotelbeds-hotels-booking-hotel-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setHotels(data.hotels.hotels);
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
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
          <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            min="1"
            required
          />
          <input
            type="number"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            min="1"
            required
          />
          <input
            type="number"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            min="0"
            required
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.code} className="offer-item">
            <div className="hotel-card">
              <h3>{hotel.name}</h3>
              <p>Category: {hotel.categoryName}</p>
              <p>Destination: {hotel.destinationName}</p>
              <p>Zone: {hotel.zoneName}</p>
              <p>Code: {hotel.code}</p>
              <button onClick={() => alert(`Booking hotel with rateKey: ${hotel.rooms[0].rates[0].rateKey}`)}>
                Book
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stays;
