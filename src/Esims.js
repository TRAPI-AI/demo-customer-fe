import React, { useState } from 'react';

const Esims = () => {
  const [countryCode, setCountryCode] = useState('');
  const [days, setDays] = useState('');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/simtex-esim-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destinations: [
            {
              countryCode,
              days: parseInt(days, 10),
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOffers(data.quoteOptions);
      } else {
        console.error('Failed to fetch offers');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input
            type="text"
            placeholder="Country Code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
          <input
            type="number"
            placeholder="Days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {offers.map((offer) => (
            <li key={offer.id} className="offer-item">
              {`ID: ${offer.id}, Total Quota: ${offer.totalQuotaGB}GB, Price: ${offer.price} ${offer.currencyCode}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Esims;

// The above code refactors the Esims component to include input fields for country code and days, a search button that triggers a POST request to the backend, and displays the offers received from the response. A loading indicator is also included.