
// Import necessary dependencies
import React, { useState } from 'react';
import DriverLocations from "./DriverLocations";

const RideHailing = () => {
  // State fields for the form
  const [clientAccountNumber, setClientAccountNumber] = useState("00001037");
  const [numberOfPassengers, setNumberOfPassengers] = useState("1");
  const [leadPassengerName, setLeadPassengerName] = useState("Daisy Hill");
  const [leadPassengerContact, setLeadPassengerContact] = useState("+447791114579");
  const [journeyTypeName, setJourneyTypeName] = useState("OneWay");
  const [isImmediateJourney, setIsImmediateJourney] = useState(false);
  const [when, setWhen] = useState("2024-11-12T08:00:00.0000000+00:00");
  const [timeZone, setTimeZone] = useState("Europe/London");
  const [pickupAddress, setPickupAddress] = useState({
    addressLine1: "Crowne Plaza Manchester Airport",
    addressLine2: "Ringway Road",
    town: "Manchester",
    postCode: "M90 3NS",
    country: "England",
    countryCode: "GBR",
    latitude: 53.364304,
    longitude: -2.268331
  });
  const [dropOffAddress, setDropOffAddress] = useState({
    addressLine1: "Liverpool Lime Street Station",
    addressLine2: "Lime Street",
    town: "Liverpool",
    county: "Merseyside",
    postCode: "L1 1JQ",
    country: "England",
    countryCode: "GBR",
    latitude: 53.407211,
    longitude: -2.9784966
  });
  const [specialInstructions, setSpecialInstructions] = useState("Please call on arrival");
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [quoteReference, setQuoteReference] = useState("");
  const [supplierQuoteReference, setSupplierQuoteReference] = useState("");
  const [quantity, setQuantity] = useState(1);

  // State for API response
  const [apiResponse, setApiResponse] = useState(null);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      data: {
        outbound: {
          quoteReference,
          vehicles: [
            {
              supplierQuoteReference,
              quantity
            }
          ]
        }
      }
    };

    try {
      const response = await fetch('http://localhost:5000/jyrney-partner-bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log(data);
      setApiResponse(data); // Set API response data
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            value={supplierQuoteReference}
            onChange={(e) => setSupplierQuoteReference(e.target.value)}
            placeholder="Supplier Quote Reference"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Book'}
          </button>
        </form>
      </div>
      <ul>
        {vehicles.map((vehicle, index) => (
          <li key={index} className="offer-item">
            <p>Supplier Name: {vehicle.supplierName}</p>
            <p>Estimated Price: {vehicle.estimatedPrice.price} {vehicle.estimatedPrice.currency}</p>
            <p>Category: {vehicle.vehicleDetails.category}</p>
            <button onClick={() => setQuoteReference(vehicle.quoteReference)}>Select</button>
          </li>
        ))}
      </ul>
      {apiResponse && (
        <div className="api-response">
          <h3>Booking Details</h3>
          <p><strong>Booking Reference:</strong> {apiResponse.bookingReference}</p>
          <h4>Outbound Journey</h4>
          <p><strong>Journey Reference:</strong> {apiResponse.outbound.journeyReference}</p>
          <p><strong>Estimated Journey Distance:</strong> {apiResponse.outbound.estimatedJourneyDistance} km</p>
          <p><strong>Estimated Journey Time:</strong> {apiResponse.outbound.estimatedJourneyTime} mins</p>
          <h4>Vehicles</h4>
          <ul>
            {apiResponse.outbound.vehicles.map((vehicle, index) => (
              <li key={index}>
                <p><strong>Job Reference:</strong> {vehicle.jobReference}</p>
                <p><strong>Vehicle Type:</strong> {vehicle.vehicleTypeName}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <DriverLocations />
    </div>
  );
};

export default RideHailing;
//
