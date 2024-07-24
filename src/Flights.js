import React, { useState } from 'react';

const Flights = () => {
  const [quoteReference, setQuoteReference] = useState('');
  const [supplierQuoteReference, setSupplierQuoteReference] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const bookingData = {
      data: {
        outbound: {
          quoteReference,
          vehicles: [
            {
              supplierQuoteReference,
              quantity: quantity.toString(),
            },
          ],
        },
      },
    };

    try {
      const response = await fetch('http://localhost:5000/jyrney-partner-bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
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
            placeholder="Quote Reference"
            value={quoteReference}
            onChange={(e) => setQuoteReference(e.target.value)}
          />
          <input
            type="text"
            placeholder="Supplier Quote Reference"
            value={supplierQuoteReference}
            onChange={(e) => setSupplierQuoteReference(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
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

export default Flights;
