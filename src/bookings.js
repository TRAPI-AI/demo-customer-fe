import React from "react";
import Navbar from "./navbar";
import ListBookings from "./ListBookings";

function Bookings() {
  return (
    <div>
      <Navbar />
      <div className="my-10 mx-28">
        <div className="text-4xl mb-6 font-bold">Your Bookings</div>
        <ListBookings />
      </div>
    </div>
  );
}

export default Bookings;
