import React, { useState } from "react";

function ListBookings() {
  const [bookingReference, setBookingReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleCancelBooking = async (bookingID) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/jyrney-cancel-booking`, {
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
      setResponseData(data);

      // Handle successful response
      console.log('Booking cancelled successfully');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={bookingReference}
          onChange={(e) => setBookingReference(e.target.value)}
          placeholder="Insert Booking Reference"
        />
        <button>Search</button>
      </div>
      <ul>
        <li className="list-item">
          Booking 1
          <button onClick={() => handleCancelBooking(bookingReference)}>Cancel Booking</button>
        </li>
        <li className="list-item">
          Booking 2
          <button onClick={() => handleCancelBooking(bookingReference)}>Cancel Booking</button>
        </li>
        <li className="list-item">
          Booking 3
          <button onClick={() => handleCancelBooking(bookingReference)}>Cancel Booking</button>
        </li>
        <li className="list-item">
          Booking 4
          <button onClick={() => handleCancelBooking(bookingReference)}>Cancel Booking</button>
        </li>
      </ul>
      {loading && <div>Loading...</div>}
      {responseData && (
        <div>
          <h3>Response Data</h3>
          <p>Field 1: {responseData.field1}</p>
          <p>Field 2: {responseData.field2}</p>
          <p>Field 3: {responseData.field3}</p>
        </div>
      )}
    </div>
  );
}

export default ListBookings;
