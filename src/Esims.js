import React, { useState } from 'react';

const Esims = () => {
  const [countryCode, setCountryCode] = useState('');
  const [days, setDays] = useState('');
  const [loading, setLoading] = useState(false);
  const [quoteOptions, setQuoteOptions] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [sendExpirationAlert, setSendExpirationAlert] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [esimOrderList, setEsimOrderList] = useState([]);

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

  const handleSelectQuote = (quote) => {
    setSelectedQuote(quote);
  };

  const handleOrder = async () => {
    setOrderLoading(true);
    const payload = {
      ESIMOrders: [
        {
          quoteId: selectedQuote.id,
          name,
          emailAddress,
          sendExpirationAlert,
        },
      ],
    };

    try {
      const response = await fetch('http://localhost:5000/simtex-esim-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);
      setEsimOrderList(data.esimOrderList || []);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setOrderLoading(false);
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
            <button onClick={() => handleSelectQuote(option)}>Select</button>
          </div>
        ))}
      </div>
      {selectedQuote && (
        <div className="order-form">
          <h3>Order Details</h3>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={sendExpirationAlert}
              onChange={(e) => setSendExpirationAlert(e.target.checked)}
            />
            Send Expiration Alert
          </label>
          <button onClick={handleOrder} disabled={orderLoading}>
            {orderLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      )}
      <div className="esim-order-list">
        {esimOrderList.map((order) => (
          <div key={order.id} className="esim-order-card">
            <p>Consumer Email: {order.consumerEmailAddress}</p>
            <p>Price: {order.price} {order.currencyCode}</p>
            <p>eSIM URL: <a href={order.esim.esimUrl} target="_blank" rel="noopener noreferrer">{order.esim.esimUrl}</a></p>
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
