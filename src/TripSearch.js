```jsx
import React, { useState } from 'react';

const FlightSearch = () => {
  const [offers, setOffers] = useState([]);

  const handleSearch = async () => {
    const payload = {
      data: {
        slices: [
          {
            origin: "LHR",
            destination: "JFK",
            departure_date: "2020-04-24"
          }
        ],
        passengers: [
          {
            type: "adult"
          }
        ]
      }
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-search', {
        method: 'POST',
        headers: {
          'Accept-Encoding': 'gzip',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Duffel-Version': 'v1',
          'Authorization': 'Bearer <YOUR_ACCESS_TOKEN>'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setOffers(data.data.offers);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSearch}>Search Flights</button>
    </div>
  );
};

export default FlightSearch;
```

```jsx
import React, { useState } from 'react';

const FlightSearch = () => {
  const [offers, setOffers] = useState([]);

  const handleSearch = async () => {
    const payload = {
      data: {
        slices: [
          {
            origin: "LHR",
            destination: "JFK",
            departure_date: "2020-04-24"
          }
        ],
        passengers: [
          {
            type: "adult"
          }
        ]
      }
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-search', {
        method: 'POST',
        headers: {
          'Accept-Encoding': 'gzip',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Duffel-Version': 'v1',
          'Authorization': 'Bearer <YOUR_ACCESS_TOKEN>'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setOffers(data.data.offers);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSearch}>Search Flights</button>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>
            <div>
              <p>Total Amount: {offer.total_amount} {offer.total_currency}</p>
              <p>Departure Date: {offer.departure_date}</p>
              <p>Destination: {offer.slices[0].destination.name}</p>
              <p>Operating Carrier: {offer.slices[0].segments[0].operating_carrier.name}</p>
              <p>Origin: {offer.slices[0].origin.name}</p>
              <p>Departing At: {offer.slices[0].segments[0].departing_at}</p>
              <p>Arriving At: {offer.slices[0].segments[0].arriving_at}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightSearch;
```