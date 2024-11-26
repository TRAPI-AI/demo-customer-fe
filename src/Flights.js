import React, { useState } from 'react';

function Flights() {
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  const fetchFlightOffers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            slices: [
              {
                origin: 'JFK',
                destination: 'LAX',
                departure_date: '2023-12-01',
              },
            ],
            passengers: [
              {
                type: 'adult',
              },
            ],
          },
        }),
      });
      const data = await response.json();
      setOffers(data.data.offers);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchFlightOffers}>Fetch Flight Offers</button>
      {loading && <p>Loading...</p>}
      <ul>
        {offers.map((offer, index) => (
          <li key={index}>
            {offer.slices.map((slice, sliceIndex) => (
              <div key={sliceIndex}>
                <p>Origin: {slice.origin.iata_code}</p>
                <p>Destination: {slice.destination.iata_code}</p>
                <p>Departure Date: {slice.departure_date}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Flights;

// The above code integrates the new endpoint with the frontend by creating a `Flights` component that fetches flight offers from the backend and displays them. The `App` component renders the `Flights` component. The backend is already set up to handle requests to the `/duffel-flights-list-offers` endpoint, as shown in the provided `backend.py` file.