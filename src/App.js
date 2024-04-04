// Here is the updated React component with the frontend API request handler:

import React, { useState } from 'react';

const TravelForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestPayload = {
      data: {
        slices: [
          {
            origin: origin,
            destination: destination,
            departure_date: departureDate
          }
        ],
        passengers: [
          {
            type: passengerType
          }
        ]
      }
    };

    const response = await fetch('http://localhost:5000/duffel-flights-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestPayload)
    });

    const data = await response.json();
    setResponse(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Origin:
          <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} />
        </label>
        <label>
          Destination:
          <input type="text" value={destination} onChange={e => setDestination(e.target.value)} />
        </label>
        <label>
          Departure Date:
          <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} />
        </label>
        <label>
          Passenger Type:
          <select value={passengerType} onChange={e => setPassengerType(e.target.value)}>
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant_without_seat">Infant Without Seat</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      {response && response.data.offers.map(offer => (
        <div key={offer.id}>
          <h2>{offer.total_amount}</h2>
          {offer.slices.map(slice => (
            <div key={slice.id}>
              <h3>{slice.departure_date}</h3>
              <p>{slice.segments[0].operating_carrier.name}</p>
              <p>{slice.segments[0].departing_at}</p>
              <p>{slice.segments[0].arriving_at}</p>
              <p>{slice.origin.name}</p>
              <p>{slice.destination.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TravelForm;

// This component now includes a fetch request to the backend API when the form is submitted. The request payload is constructed from the form data, and the response data is stored in the component's state. The response data is then mapped over to display the relevant information for each offer and slice.