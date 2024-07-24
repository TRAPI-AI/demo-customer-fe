import React, { useState } from 'react';

const RideHailing = () => {
  const [clientAccountNumber, setClientAccountNumber] = useState('00001037');
  const [leadPassengerName, setLeadPassengerName] = useState('Daisy Hill');
  const [leadPassengerContact, setLeadPassengerContact] = useState('+447791114579');
  const [journeyTypeName, setJourneyTypeName] = useState('OneWay');
  const [isImmediateJourney, setIsImmediateJourney] = useState(false);
  const [outboundWhen, setOutboundWhen] = useState('2024-11-12T08:00:00.0000000+00:00');
  const [pickupLatitude, setPickupLatitude] = useState(53.364304);
  const [pickupLongitude, setPickupLongitude] = useState(-2.268331);
  const [dropOffLatitude, setDropOffLatitude] = useState(53.407211);
  const [dropOffLongitude, setDropOffLongitude] = useState(-2.9784966);
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [quoteReference, setQuoteReference] = useState('');
  const [supplierQuoteReference, setSupplierQuoteReference] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [bookingReference, setBookingReference] = useState('');
  const [outbound, setOutbound] = useState({
    journeyReference: '',
    estimatedJourneyDistance: 1,
    estimatedJourneyTime: 1,
    vehicles: [],
  });

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      data: {
        clientAccountNumber,
        passengers: [
          {
            isLeadPassenger: true,
            name: leadPassengerName,
            contactNumber: leadPassengerContact,
          },
        ],
        journeyTypeName,
        isImmediateJourney,
        outbound: {
          when: outboundWhen,
          pickup: {
            latitude: pickupLatitude,
            longitude: pickupLongitude,
          },
          dropOff: {
            latitude: dropOffLatitude,
            longitude: dropOffLongitude,
          },
        },
      },
    };

    try {
      const response = await fetch('http://localhost:5000/jyrney-create-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setQuoteReference(data.outbound.quoteReference);
      setVehicles(data.outbound.vehicles);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    setLoading(true);
    const bookingPayload = {
      data: {
        outbound: {
          quoteReference,
          vehicles: [
            {
              supplierQuoteReference,
              quantity,
            },
          ],
        },
      },
    };

    try {
      const response = await fetch('http://localhost:5000/jyrney-partner-bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });
      const data = await response.json();
      console.log('Booking response:', data);
      setBookingReference(data.bookingReference);
      setOutbound(data.outbound);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input
            type="text"
            value={clientAccountNumber}
            onChange={(e) => setClientAccountNumber(e.target.value)}
            placeholder="Client Account Number"
          />
          <input
            type="text"
            value={leadPassengerName}
            onChange={(e) => setLeadPassengerName(e.target.value)}
            placeholder="Lead Passenger Name"
          />
          <input
            type="text"
            value={leadPassengerContact}
            onChange={(e) => setLeadPassengerContact(e.target.value)}
            placeholder="Lead Passenger Contact"
          />
          <input
            type="text"
            value={journeyTypeName}
            onChange={(e) => setJourneyTypeName(e.target.value)}
            placeholder="Journey Type Name"
          />
          <input
            type="datetime-local"
            value={outboundWhen}
            onChange={(e) => setOutboundWhen(e.target.value)}
            placeholder="Outbound When"
          />
          <input
            type="number"
            value={pickupLatitude}
            onChange={(e) => setPickupLatitude(e.target.value)}
            placeholder="Pickup Latitude"
          />
          <input
            type="number"
            value={pickupLongitude}
            onChange={(e) => setPickupLongitude(e.target.value)}
            placeholder="Pickup Longitude"
          />
          <input
            type="number"
            value={dropOffLatitude}
            onChange={(e) => setDropOffLatitude(e.target.value)}
            placeholder="DropOff Latitude"
          />
          <input
            type="number"
            value={dropOffLongitude}
            onChange={(e) => setDropOffLongitude(e.target.value)}
            placeholder="DropOff Longitude"
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      <ul>
        {vehicles.map((vehicle, index) => (
          <li key={index} className="offer-item">
            <p>Supplier Name: {vehicle.supplierName}</p>
            <p>Estimated Price: {vehicle.estimatedPrice.price} {vehicle.estimatedPrice.currency}</p>
            <p>Category: {vehicle.vehicleDetails.category}</p>
            <button onClick={() => {
              setSupplierQuoteReference(vehicle.supplierQuoteReference);
              handleBooking();
            }}>Book</button>
          </li>
        ))}
      </ul>
      <div className="booking-response">
        <p>Quote Reference: {quoteReference}</p>
        <p>Booking Reference: {bookingReference}</p>
        <div className="outbound-details">
          <p>Journey Reference: {outbound.journeyReference}</p>
          <p>Estimated Journey Distance: {outbound.estimatedJourneyDistance} km</p>
          <p>Estimated Journey Time: {outbound.estimatedJourneyTime} minutes</p>
          <ul>
            {outbound.vehicles.map((vehicle, index) => (
              <li key={index}>
                <p>Job Reference: {vehicle.jobReference}</p>
                <p>Vehicle Type: {vehicle.vehicleTypeName}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RideHailing;
