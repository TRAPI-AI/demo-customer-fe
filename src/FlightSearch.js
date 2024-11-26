import React, { useState } from 'react';
import FlightResults from './FlightResults';

const FlightSearch = () => {
  const [searchData, setSearchData] = useState(null);

  const handleSearch = () => {
    const requestData = {
      data: {
        slices: [
          {
            origin: 'JFK',
            destination: 'LAX',
            departure_date: '2023-12-01',
            departure_time: { from: '06:00', to: '12:00' },
            arrival_time: { from: '09:00', to: '15:00' },
          },
        ],
        passengers: [
          { type: 'adult', given_name: 'John', family_name: 'Doe' },
        ],
        cabin_class: 'economy',
      },
    };
    setSearchData(requestData);
  };

  return (
    <div>
      <button onClick={handleSearch}>Search Flights</button>
      {searchData && <FlightResults searchData={searchData} />}
    </div>
  );
};

export default FlightSearch;

// End of response

This refactored code integrates the frontend components `FlightSearch` and `FlightResults` with the backend API endpoint `/duffel-flights-list-offers`. The `FlightSearch` component prepares the request data and triggers the search, while the `FlightResults` component handles the API call and displays the flight offers. A loading indicator is shown while the data is being fetched.