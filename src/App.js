Sure, here is the complete React code for your `App` component. This code includes the `OfferRequestForm` component and its state management, form fields, and form submission handling. 

```jsx
import React, { useState } from 'react';

function App() {
  return (
    <div className="App">
      <OfferRequestForm />
    </div>
  );
}

function OfferRequestForm() {
  const [slices, setSlices] = useState([{origin: "", destination: "", departure_date: ""}]);
  const [passengers, setPassengers] = useState([{type: ""}]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/offer_requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slices, passengers }),
      });

      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Slices</h2>
      {slices.map((slice, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Origin"
            value={slice.origin}
            onChange={(e) => {
              const newSlices = [...slices];
              newSlices[index].origin = e.target.value;
              setSlices(newSlices);
            }}
          />
          <input
            type="text"
            placeholder="Destination"
            value={slice.destination}
            onChange={(e) => {
              const newSlices = [...slices];
              newSlices[index].destination = e.target.value;
              setSlices(newSlices);
            }}
          />
          <input
            type="date"
            placeholder="Departure Date"
            value={slice.departure_date}
            onChange={(e) => {
              const newSlices = [...slices];
              newSlices[index].departure_date = e.target.value;
              setSlices(newSlices);
            }}
          />
        </div>
      ))}
      <h2>Passengers</h2>
      {passengers.map((passenger, index) => (
        <div key={index}>
          <select
            value={passenger.type}
            onChange={(e) => {
              const newPassengers = [...passengers];
              newPassengers[index].type = e.target.value;
              setPassengers(newPassengers);
            }}
          >
            <option value="">Select passenger type</option>
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant">Infant</option>
          </select>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
```

This code assumes that your server is running on `http://localhost:5000` and that you have an endpoint `/api/offer_requests` that accepts a POST request with a JSON body containing `slices` and `passengers` arrays.

Please ensure that you have the necessary CORS settings on your server to accept requests from the domain where this React app is running.