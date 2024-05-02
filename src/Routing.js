import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./search.js";
import OperatorSearch from "./operatorSearch.js";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/operatorSearch" element={<OperatorSearch />} />
        <Route path="/" element={<Search />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
