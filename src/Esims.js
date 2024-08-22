import React, { useState } from 'react';

const Esims = () => {
  const [countryCode, setCountryCode] = useState('');
  const [days, setDays] = useState('');
  const [loading, setLoading] = useState(false);
  const [quoteOptions, setQuoteOptions] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    const payload = {
      destinations: [
        {
          countryCode,
          days: parseInt(days, 10),
        },
      ],
    };

    try {
      const response = await fetch('http://localhost:5000/simtex-esim-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);
      setQuoteOptions(data.quoteOptions || []);
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
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      <div className="quote-options">
        {quoteOptions.map((option) => (
          <div key={option.id} className="quote-box">
            <p>Price: {option.price} {option.currencyCode}</p>
            <p>Total Quota: {option.totalQuotaGB} GB</p>
            <button>Select</button>
          </div>
        ))}
      </div>
      <ul>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
      </ul>
    </div>
  );
};

export default Esims;
