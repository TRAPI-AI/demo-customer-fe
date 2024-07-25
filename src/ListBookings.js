import React, { useState } from "react";

function ListBookings() {
  const [bookings, setBookings] = useState([
    { bookingID: "12345", name: "Booking 1" },
    { bookingID: "67890", name: "Booking 2" },
    { bookingID: "54321", name: "Booking 3" },
    { bookingID: "09876", name: "Booking 4" },
  ]);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleCancelBooking = async (bookingID) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/jyrney-cancel-booking", {
        method: "DEL",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingReference: bookingID }),
      });
      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
        setBookings(bookings.filter((booking) => booking.bookingID !== bookingID));
      } else {
        console.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <input />
        <input />
        <button>Search</button>
      </div>
      {loading && <div>Loading...</div>}
      <ul>
        {bookings.map((booking) => (
          <li key={booking.bookingID} className="list-item">
            {booking.name}
            <button onClick={() => handleCancelBooking(booking.bookingID)}>Cancel Booking</button>
          </li>
        ))}
      </ul>
      {responseData && (
        <div>
          <h3>Response Data</h3>
          <ul>
            <li>Field 1: {responseData.field1}</li>
            <li>Field 2: {responseData.field2}</li>
            <li>Field 3: {responseData.field3}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ListBookings;
