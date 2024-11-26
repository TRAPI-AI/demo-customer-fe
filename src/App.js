import React, { useState } from 'react';
import Flights from './Flights';

function App() {
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  const fetchFlightOffers = async (requestData) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      setOffers(data.data.offers || []);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Flight Offers</h1>
      <Flights fetchFlightOffers={fetchFlightOffers} offers={offers} loading={loading} />
    </div>
  );
}

export default App;