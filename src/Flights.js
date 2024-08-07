import React, { useState } from 'react';

const Flights = () => {
  const [bookingReference, setBookingReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleCancelBooking = async (bookingID) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/jyrney-cancel-booking', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingReference: bookingID }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Booking cancelled:', data);
      setResponseData(data); // Set the response data to state
    } catch (error) {
      console.error('Error cancelling booking:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input />
          <input />
          <input />
          <input />
          <button>Search</button>
        </div>
      </div>
      <div>
        <label htmlFor="bookingReference">Insert Booking Reference</label>
        <input
          id="bookingReference"
          type="text"
          value={bookingReference}
          onChange={(e) => setBookingReference(e.target.value)}
        />
        <button onClick={() => handleCancelBooking(bookingReference)}>Cancel Booking</button>
      </div>
      {loading && <div>Loading...</div>}
      <ul>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
      </ul>
      {/* Display response data */}
      {responseData && (
        <div className="response-data">
          <h3>Response Data</h3>
          <p>Field 1: {responseData.field1}</p>
          <p>Field 2: {responseData.field2}</p>
          <p>Field 3: {responseData.field3}</p>
        </div>
      )}
    </div>
  );
};

export default Flights;
