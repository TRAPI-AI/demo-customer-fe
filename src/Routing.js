import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./search.js";
import Bookings from "./bookings.js";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
