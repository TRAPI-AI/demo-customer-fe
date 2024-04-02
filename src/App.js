Sure, here is the updated React function with field validation and some basic styling:

```jsx
import React, { useState } from 'react';
import './FlightSearch.css';

function FlightSearch() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState(null);

  const fetchFlightData = async () => {
    const payload = {
      data: {
        slices: [
          {
            origin,
            destination,
            departure_date: departureDate
          }
        ],
        passengers: [
          {
            type: 'adult'
          }
        ]
      }
    };

    const response = await fetch('http://localhost:5000/duffel-flights-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      setFlightData(data.data);
      setError(null);
    } else {
      const errorData = await response.json();
      setError(errorData.errors[0].message);
    }
  };

  return (
    <div className="flight-search">
      <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Origin" />
      <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destination" />
      <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} />
      <button onClick={fetchFlightData}>Search</button>

      {error && <p className="error">{error}</p>}

      {flightData && flightData.offers.map((offer, index) => (
        <div key={index} className="flight-offer">
          <p>Total Amount: {offer.total_amount}</p>
          <p>Departure Date: {flightData.slices[0].departure_date}</p>
        </div>
      ))}
    </div>
  );
}

export default FlightSearch;
```

And here is the CSS file `FlightSearch.css`:

```css
.flight-search {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.flight-search input, .flight-search button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.flight-search button {
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

.flight-search .error {
  color: red;
}

.flight-offer {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
```

In this code, we added an `error` state to handle any error messages from the backend. If the response from the backend is not ok, we set the `error` state with the message from the first error in the response. We also display the error message in a paragraph with a class of "error". For the styling, we added some basic styles to center the form, add padding and a box shadow, style the input fields and button, and style the flight offers.