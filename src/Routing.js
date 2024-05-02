import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CruiseSearch from "./cruiseSearch.js";
import OperatorSearch from "./operatorSearch.js";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/operatorSearch" element={<OperatorSearch />} />
        <Route path="/cruiseSearch" element={<CruiseSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
