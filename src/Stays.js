import React, { useState } from 'react';

const Stays = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [placeName, setPlaceName] = useState('');
  const [radius, setRadius] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);

  const getCoordinates = async (placeName) => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${apiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      console.log('Geocoding response:', data); // Log the geocoding response
      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      } else {
        throw new Error('No results found for the specified place name.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { latitude, longitude } = await getCoordinates(placeName);
      const requestBody = {
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
        geolocation: {
          latitude,
          longitude,
          radius,
          unit: 'km',
        },
      };

      const response = await fetch('http://localhost:5000/hotelbeds-hotels-booking-hotel-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('API response:', data);

      // Extract hotels data from the API response
      if (data.hotels && data.hotels.hotels) {
        setHotels(data.hotels.hotels);
      }
    } catch (error) {
      console.error('API request error:', error);
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
            placeholder="Check-in Date"
          />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            placeholder="Check-out Date"
          />
          <input
            type="text"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            placeholder="Place Name"
          />
          <input
            type="number"
            min="1"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            placeholder="Rooms"
          />
          <input
            type="number"
            min="1"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            placeholder="Adults"
          />
          <input
            type="number"
            min="0"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            placeholder="Children"
          />
          <input
            type="number"
            min="1"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            placeholder="Radius (km)"
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      <div className="hotel-list">
        {hotels.map((hotel) => {
          const rateKey = hotel.rooms[0].rates[0].rateKey;
          return (
            <div key={hotel.code} className="hotel-item">
              <h3>{hotel.name}</h3>
              <p>Category: {hotel.categoryName}</p>
              <p>Destination: {hotel.destinationName}</p>
              <p>Zone: {hotel.zoneName}</p>
              <p>Code: {hotel.code}</p>
              <button onClick={() => console.log(`Booking with rateKey: ${rateKey}`)}>Book</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stays;
