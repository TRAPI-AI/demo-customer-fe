import React, { useState } from "react";
import FlightResults from './FlightResults';

const FlightSearch = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const originCoordinates = await getCoordinates(origin);
      const destinationCoordinates = await getCoordinates(destination);

      const requestBody = {
        stay: {
          checkIn: departureDate,
          checkOut: departureDate, // Assuming same day check-out for simplicity
        },
        occupancies: [
          {
            rooms: 1, // Assuming 1 room for simplicity
            adults: adults,
            children: children,
          },
        ],
        geolocation: {
          latitude: originCoordinates.latitude,
          longitude: originCoordinates.longitude,
          radius: 50, // Assuming a default radius
          unit: "km",
        },
      };

      const response = await fetch("http://localhost:5000/hotelbeds-hotels-booking-hotel-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch hotel availability.");
      }

      const data = await response.json();
      console.log("Response Data:", data);
      // Handle the response data
    } catch (error) {
      console.error("Error during search:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input className="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Origin" />
          <input className="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" />
          <input className="departure-date" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
          <select className="passenger-type" value={adults} onChange={(e) => setAdults(parseInt(e.target.value))}>
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>{num + 1} Adult{num > 0 ? 's' : ''}</option>
            ))}
          </select>
          <select className="children-type" value={children} onChange={(e) => setChildren(parseInt(e.target.value))}>
            {[...Array(10).keys()].map((num) => (
              <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
            ))}
          </select>
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
      <FlightResults />
    </div>
  );
};

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

export default FlightSearch;
