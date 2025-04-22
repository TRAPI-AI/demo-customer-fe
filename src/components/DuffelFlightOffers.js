import React, { useState } from 'react';

const initialSlice = {
  origin: '',
  destination: '',
  departure_time: { from: '', to: '' },
  departure_date: '',
  arrival_time: { from: '', to: '' },
};

const initialPassenger = {
  family_name: '',
  given_name: '',
  loyalty_programme_accounts: [{ account_number: '', airline_iata_code: '' }],
  type: '',
};

const initialPrivateFares = {
  QF: [{ corporate_code: '', tracking_reference: '' }],
  UA: [{ corporate_code: '', tour_code: '' }],
};

const cabinClassOptions = [
  'first',
  'business',
  'premium_economy',
  'economy',
];

function DuffelFlightOffers() {
  const [slices, setSlices] = useState([initialSlice]);
  const [privateFares, setPrivateFares] = useState(initialPrivateFares);
  const [passengers, setPassengers] = useState([initialPassenger]);
  const [maxConnections, setMaxConnections] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');
  const [offers, setOffers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Validation helpers
  const validate = () => {
    if (!slices.length || !slices[0].origin || !slices[0].destination || !slices[0].departure_date) {
      setError('Please fill in at least one slice with origin, destination, and departure date.');
      return false;
    }
    for (const p of passengers) {
      if (!p.type) {
        setError('Each passenger must have a type.');
        return false;
      }
    }
    if (!cabinClass) {
      setError('Please select a cabin class.');
      return false;
    }
    setError(null);
    return true;
  };

  // Handlers for form fields
  const handleSliceChange = (idx, field, value) => {
    const updated = slices.map((s, i) =>
      i === idx ? { ...s, [field]: value } : s
    );
    setSlices(updated);
  };

  const handleSliceTimeChange = (idx, timeField, subField, value) => {
    const updated = slices.map((s, i) =>
      i === idx ? { ...s, [timeField]: { ...s[timeField], [subField]: value } } : s
    );
    setSlices(updated);
  };

  const handlePassengerChange = (idx, field, value) => {
    const updated = passengers.map((p, i) =>
      i === idx ? { ...p, [field]: value } : p
    );
    setPassengers(updated);
  };

  const handleLoyaltyChange = (pIdx, lIdx, field, value) => {
    const updated = passengers.map((p, i) => {
      if (i !== pIdx) return p;
      const loyalty = p.loyalty_programme_accounts.map((l, j) =>
        j === lIdx ? { ...l, [field]: value } : l
      );
      return { ...p, loyalty_programme_accounts: loyalty };
    });
    setPassengers(updated);
  };

  const handleAddSlice = () => setSlices([...slices, initialSlice]);
  const handleRemoveSlice = idx => setSlices(slices.filter((_, i) => i !== idx));

  const handleAddPassenger = () => setPassengers([...passengers, initialPassenger]);
  const handleRemovePassenger = idx => setPassengers(passengers.filter((_, i) => i !== idx));

  // Private fares handlers (simplified for demo)
  const handlePrivateFareChange = (carrier, idx, field, value) => {
    setPrivateFares(prev => ({
      ...prev,
      [carrier]: prev[carrier].map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Submit handler
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError(null);
    setOffers(null);
    try {
      const reqBody = {
        data: {
          slices: slices.map(s => ({
            ...s,
            departure_time: { ...s.departure_time },
            arrival_time: { ...s.arrival_time },
          })),
          private_fares: privateFares,
          passengers: passengers.map(p => ({
            ...p,
            loyalty_programme_accounts: p.loyalty_programme_accounts.map(l => ({ ...l })),
          })),
          max_connections: maxConnections,
          cabin_class: cabinClass,
        },
      };
      const resp = await fetch('/duffel-flights-list-offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      });
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || 'Unknown error');
      }
      const data = await resp.json();
      setOffers(data.data?.offers || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render helpers
  const renderOffer = offer => (
    <div key={offer.id} className="offer-card" style={{ border: '1px solid #ccc', margin: '1em 0', padding: '1em' }}>
      <div><b>Total Amount:</b> {offer.total_amount} {offer.total_currency}</div>
      <div><b>Base Amount:</b> {offer.base_amount} {offer.base_currency}</div>
      <div><b>Tax:</b> {offer.tax_amount} {offer.tax_currency}</div>
      <div><b>Emissions:</b> {offer.total_emissions_kg} kg</div>
      <div><b>Payment Required By:</b> {offer.payment_requirements?.payment_required_by}</div>
      <div><b>Expires At:</b> {offer.expires_at}</div>
      <div><b>Cabin Class:</b> {offer.slices?.[0]?.segments?.[0]?.passengers?.[0]?.cabin_class_marketing_name}</div>
      <div><b>Segments:</b>
        <ul>
          {offer.slices?.flatMap(slice =>
            slice.segments.map(seg => (
              <li key={seg.departing_at + seg.arriving_at}>
                {seg.origin?.iata_code} → {seg.destination?.iata_code} | {seg.departing_at} - {seg.arriving_at} | {seg.marketing_carrier?.name} {seg.marketing_carrier_flight_number}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 800, margin: '2em auto', padding: 20, background: '#fafbfc', borderRadius: 8 }}>
      <h2>Search Duffel Flight Offers</h2>
      <form onSubmit={handleSubmit}>
        <h3>Flight Slices</h3>
        {slices.map((slice, idx) => (
          <div key={idx} style={{ border: '1px solid #eee', padding: 10, marginBottom: 10 }}>
            <label>
              Origin (IATA):
              <input value={slice.origin} onChange={e => handleSliceChange(idx, 'origin', e.target.value.toUpperCase())} maxLength={3} required />
            </label>
            <label style={{ marginLeft: 10 }}>
              Destination (IATA):
              <input value={slice.destination} onChange={e => handleSliceChange(idx, 'destination', e.target.value.toUpperCase())} maxLength={3} required />
            </label>
            <label style={{ marginLeft: 10 }}>
              Departure Date:
              <input type="date" value={slice.departure_date} onChange={e => handleSliceChange(idx, 'departure_date', e.target.value)} required />
            </label>
            <div>
              <label>
                Departure Time From:
                <input type="time" value={slice.departure_time.from} onChange={e => handleSliceTimeChange(idx, 'departure_time', 'from', e.target.value)} />
              </label>
              <label style={{ marginLeft: 10 }}>
                Departure Time To:
                <input type="time" value={slice.departure_time.to} onChange={e => handleSliceTimeChange(idx, 'departure_time', 'to', e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                Arrival Time From:
                <input type="time" value={slice.arrival_time.from} onChange={e => handleSliceTimeChange(idx, 'arrival_time', 'from', e.target.value)} />
              </label>
              <label style={{ marginLeft: 10 }}>
                Arrival Time To:
                <input type="time" value={slice.arrival_time.to} onChange={e => handleSliceTimeChange(idx, 'arrival_time', 'to', e.target.value)} />
              </label>
            </div>
            {slices.length > 1 && (
              <button type="button" onClick={() => handleRemoveSlice(idx)} style={{ marginLeft: 10 }}>Remove Slice</button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddSlice}>Add Slice</button>

        <h3>Passengers</h3>
        {passengers.map((p, idx) => (
          <div key={idx} style={{ border: '1px solid #eee', padding: 10, marginBottom: 10 }}>
            <label>
              Given Name:
              <input value={p.given_name} onChange={e => handlePassengerChange(idx, 'given_name', e.target.value)} />
            </label>
            <label style={{ marginLeft: 10 }}>
              Family Name:
              <input value={p.family_name} onChange={e => handlePassengerChange(idx, 'family_name', e.target.value)} />
            </label>
            <label style={{ marginLeft: 10 }}>
              Type:
              <input value={p.type} onChange={e => handlePassengerChange(idx, 'type', e.target.value)} required placeholder="adult, child, etc." />
            </label>
            <div>
              <b>Loyalty Programme Accounts</b>
              {p.loyalty_programme_accounts.map((l, lIdx) => (
                <div key={lIdx}>
                  <label>
                    Account Number:
                    <input value={l.account_number} onChange={e => handleLoyaltyChange(idx, lIdx, 'account_number', e.target.value)} />
                  </label>
                  <label style={{ marginLeft: 10 }}>
                    Airline IATA Code:
                    <input value={l.airline_iata_code} onChange={e => handleLoyaltyChange(idx, lIdx, 'airline_iata_code', e.target.value.toUpperCase())} maxLength={2} />
                  </label>
                </div>
              ))}
            </div>
            {passengers.length > 1 && (
              <button type="button" onClick={() => handleRemovePassenger(idx)} style={{ marginLeft: 10 }}>Remove Passenger</button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddPassenger}>Add Passenger</button>

        <h3>Private Fares</h3>
        <div>
          <b>QF</b>
          {privateFares.QF.map((qf, idx) => (
            <div key={idx}>
              <label>
                Corporate Code:
                <input value={qf.corporate_code} onChange={e => handlePrivateFareChange('QF', idx, 'corporate_code', e.target.value)} />
              </label>
              <label style={{ marginLeft: 10 }}>
                Tracking Reference:
                <input value={qf.tracking_reference} onChange={e => handlePrivateFareChange('QF', idx, 'tracking_reference', e.target.value)} />
              </label>
            </div>
          ))}
        </div>
        <div>
          <b>UA</b>
          {privateFares.UA.map((ua, idx) => (
            <div key={idx}>
              <label>
                Corporate Code:
                <input value={ua.corporate_code} onChange={e => handlePrivateFareChange('UA', idx, 'corporate_code', e.target.value)} />
              </label>
              <label style={{ marginLeft: 10 }}>
                Tour Code:
                <input value={ua.tour_code} onChange={e => handlePrivateFareChange('UA', idx, 'tour_code', e.target.value)} />
              </label>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          <label>
            Max Connections:
            <input type="number" min={0} max={5} value={maxConnections} onChange={e => setMaxConnections(Number(e.target.value))} />
          </label>
          <label style={{ marginLeft: 20 }}>
            Cabin Class:
            <select value={cabinClass} onChange={e => setCabinClass(e.target.value)} required>
              {cabinClassOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginTop: 20 }}>
          <button type="submit" disabled={loading}>Search Offers</button>
        </div>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      </form>

      {loading && <div>Loading offers...</div>}
      {offers && (
        <div style={{ marginTop: 30 }}>
          <h3>Flight Offers</h3>
          {offers.length === 0 && <div>No offers found.</div>}
          {offers.map(renderOffer)}
        </div>
      )}
    </div>
  );
}

export default DuffelFlightOffers;
