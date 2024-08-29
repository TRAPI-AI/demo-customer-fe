import React, { useState } from 'react';

const Esims = () => {
  const [countryCode, setCountryCode] = useState('');
  const [days, setDays] = useState('');
  const [loading, setLoading] = useState(false);
  const [quoteOptions, setQuoteOptions] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
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

  const handleOrder = async () => {
    setOrderLoading(true);
    const payload = {
      esimOrders: [
        {
          quoteId: selectedQuote.id,
          name,
          emailAddress,
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
            <button onClick={() => setSelectedQuote(option)}>Select</button>
          </div>
        ))}
      </div>
      {selectedQuote && (
        <div className="order-form">
          <h3>Order Details</h3>
          <p>Quote ID: {selectedQuote.id}</p>
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
          <button onClick={handleOrder} disabled={orderLoading}>
            {orderLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      )}
      <ul>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
      </ul>
      <div className="response-data">
        {esimOrderList.map((order) => (
          <div key={order.id} className="order-card">
            <p>Consumer Email Address: {order.consumerEmailAddress}</p>
            <p>Price: {order.price} {order.currencyCode}</p>
            <p>eSIM URL: <a href={order.esim.esimUrl} target="_blank" rel="noopener noreferrer">{order.esim.esimUrl}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Esims;
