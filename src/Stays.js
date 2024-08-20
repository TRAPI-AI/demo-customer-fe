import React, { useState } from 'react';

const Stays = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [placeName, setPlaceName] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
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
      const coordinates = await getCoordinates(placeName);
      setLatitude(coordinates.latitude);
      setLongitude(coordinates.longitude);

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
        geolocation: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          radius,
          unit: 'km',
        },
      };

      const response = await fetch('http://localhost:5000/hotelbeds-hotels-booking-hotel-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('API response:', data);
      setHotels(data.hotels.hotels);
    } catch (error) {
      console.error('Search error:', error);
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
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            min="1"
            placeholder="Rooms"
          />
          <input
            type="number"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            min="1"
            placeholder="Adults"
          />
          <input
            type="number"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            min="0"
            placeholder="Children"
          />
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            min="1"
            placeholder="Radius (km)"
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      {/* Response items go in this container */}
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.code} className="hotel-item">
            <div className="hotel-details">
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
