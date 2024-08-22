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
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            placeholder="Country Code"
          />
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Days"
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      <div className="response-area">
        <ul className="quote-list">
          {quoteOptions.map((quote) => (
            <li key={quote.id} className="quote-item">
              <div className="quote-details">
                <p>Price: {quote.price} {quote.currencyCode}</p>
                <p>Total Quota: {quote.totalQuotaGB} GB</p>
                <button>Select</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Esims;


css
/* Add this CSS to ensure the response items are displayed in a horizontal row of boxes */
.response-area {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.quote-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

.quote-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px;
  width: 200px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.quote-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

