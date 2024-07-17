import React from "react";
import Navbar from "./navbar";
import DriverLocations from "./DriverLocations";

function Map() {
  return (
    <div>
      <Navbar />
      <div className="my-10 mx-28">
        <div className="text-4xl mb-6 font-bold">Map</div>
        <DriverLocations/>
      </div>
    </div>
  );
}

export default Map;
