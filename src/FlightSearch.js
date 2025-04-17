import React, { useState } from "react";
import FlightResults from './FlightResults';

const initialPassenger = { family_name: '', given_name: '', loyalty_programme_accounts: [{ account_number: '', airline_iata_code: '' }], type: 'adult' };

const FlightSearch = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengerType, setPassengerType] = useState("adult");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  // For demo, only one passenger
  const buildRequestBody = () => {
    return {
      data: {
        slices: [
          {
            origin: origin,
            destination: destination,
            departure_date: departureDate,
            departure_time: {}, // Not using time range in UI
            arrival_time: {}, // Not using time range in UI
          },
        ],
        private_fares: {
          QF: [{ corporate_code: '', tracking_reference: '' }],
          UA: [{ corporate_code: '', tour_code: '' }],
        },
        passengers: [
          {
            ...initialPassenger,
            type: passengerType,
          },
        ],
        max_connections: 1,
        cabin_class: 'economy',
      },
    };
  };

  const validate = () => {
    if (!origin.trim()) return "Origin is required";
    if (!destination.trim()) return "Destination is required";
    if (!departureDate) return "Departure date is required";
    if (!passengerType) return "Passenger type is required";
    return null;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResults(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/duffel-flights-list-offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildRequestBody()),
      });
      if (!response.ok) {
        const err = await response.json();
        setError(err.error || "Failed to fetch offers");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setResults(data.data?.offers || []);
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <form className="search" onSubmit={handleSearch}>
          {/* Input fields go in this container */}
          <input
            className="origin"
            placeholder="Origin (IATA code)"
            value={origin}
            onChange={e => setOrigin(e.target.value.toUpperCase())}
            maxLength={3}
            required
          />
          <input
            className="destination"
            placeholder="Destination (IATA code)"
            value={destination}
            onChange={e => setDestination(e.target.value.toUpperCase())}
            maxLength={3}
            required
          />
          <input
            className="departure-date"
            type="date"
            value={departureDate}
            onChange={e => setDepartureDate(e.target.value)}
            required
          />
          <select
            className="passenger-type"
            value={passengerType}
            onChange={e => setPassengerType(e.target.value)}
            required
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant_without_seat">Infant (no seat)</option>
            <option value="infant_with_seat">Infant (with seat)</option>
          </select>
          <button className="search-button" type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {error && <div className="error" style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </div>
      <FlightResults results={results} />
    </div>
  );
};

export default FlightSearch;
