import React, { useState } from "react";
import StaysResults from './StaysResults';

const StaysSearch = () => {
  const [placeName, setPlaceName] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const getCoordinates = async (placeName) => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${apiKey}`;
    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      console.log('Geocoding response:', data);
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
            rooms: 1,
            adults,
            children,
          },
        ],
        geolocation: {
          latitude,
          longitude,
          radius: 50,
          unit: "km",
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
      setResults(data.hotels.hotels);
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
            placeholder="Place"
            className="placeName"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
          />
          <input
            className="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <input
            className="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
          <input
            placeholder="Adults"
            className="adults"
            type="number"
            value={adults}
            min="1"
            onChange={(e) => setAdults(e.target.value)}
          />
          <input
            placeholder="Children"
            className="children"
            type="number"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {loading ? <p>Loading...</p> : <StaysResults results={results} />}
    </div>
  );
};

export default StaysSearch;