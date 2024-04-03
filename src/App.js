

Sure, here is a simple React component that creates the necessary form fields and displays the response data:

```jsx
import React, { useState } from 'react';

const TravelForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you would make the API request with the form data and set the response
    // For now, we'll just log the form data
    console.log({ origin, destination, departureDate });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Origin:
          <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        </label>
        <label>
          Destination:
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </label>
        <label>
          Departure Date:
          <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          {response.data.offers.map((offer) => (
            <div key={offer.id}>
              <h2>{offer.total_amount}</h2>
              {offer.slices.map((slice) => (
                <div key={slice.id}>
                  <p>Departure Date: {slice.departure_date}</p>
                  <p>Destination: {slice.destination.name}</p>
                  <p>Operating Carrier: {slice.segments[0].operating_carrier.name}</p>
                  <p>Origin: {slice.origin.name}</p>
                  <p>Departing At: {slice.segments[0].departing_at}</p>
                  <p>Arriving At: {slice.segments[0].arriving_at}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelForm;
```

This component includes a form with fields for the origin, destination, and departure date. When the form is submitted, it logs the form data. It also includes a display area for the response data, which is structured according to your specifications. The response data is currently set to `null`, so nothing will be displayed until you integrate the API and set the response data.