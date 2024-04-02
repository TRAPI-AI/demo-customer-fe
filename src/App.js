import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TripSearch from "./TripSearch";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/TripSearch" />} />
        <Route path="/TripSearch" element={<TripSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
