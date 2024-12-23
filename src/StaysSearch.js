import React, { useState } from "react";
import StaysResults from './StaysResults';

const StaysSearch = () => {
  const [searchParams, setSearchParams] = useState({
    place: '',
    checkIn: '',
    checkOut: '',
    adults: 0,
    children: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = async () => {
    const requestBody = {
      data: {
        slices: [
          {
            origin: searchParams.place,
            destination: searchParams.place,
            departure_date: searchParams.checkIn,
            arrival_time: { from: "00:00", to: "23:59" }
          }
        ],
        passengers: [
          { type: "adult", age: searchParams.adults },
          { type: "child", age: searchParams.children }
        ],
        max_connections: 1,
        cabin_class: "economy"
      }
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
      console.log(data);
      // Pass data to StaysResults component or handle it as needed
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input
            name="place"
            placeholder="Place"
            className="placeName"
            value={searchParams.place}
            onChange={handleInputChange}
          />
          <input
            name="checkIn"
            className="checkIn"
            type="date"
            value={searchParams.checkIn}
            onChange={handleInputChange}
          />
          <input
            name="checkOut"
            className="checkOut"
            type="date"
            value={searchParams.checkOut}
            onChange={handleInputChange}
          />
          <input
            name="adults"
            placeholder="Adults"
            className="adults"
            type="number"
            value={searchParams.adults}
            onChange={handleInputChange}
          />
          <input
            name="children"
            placeholder="Children"
            className="children"
            type="number"
            value={searchParams.children}
            onChange={handleInputChange}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <StaysResults />
    </div>
  );
};

export default StaysSearch;