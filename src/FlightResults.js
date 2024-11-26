import React, { useState, useEffect } from 'react';

const FlightResults = ({ searchData }) => {
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(searchData),
        });
        const data = await response.json();
        setOffers(data.data.offers);
      } catch (error) {
        console.error('Error fetching flight offers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [searchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {offers.map((offer) => (
        <div key={offer.id}>
          <h3>Offer ID: {offer.id}</h3>
          <p>Total Amount: {offer.total_amount} {offer.total_currency}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default FlightResults;