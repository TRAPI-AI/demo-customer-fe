import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./search.js";
import Bookings from "./bookings.js";
import Map from "./map.js";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;