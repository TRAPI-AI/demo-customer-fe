import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frontend from "./frontend.js";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontend />} />
        <Route path="/frontend" element={<Frontend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
