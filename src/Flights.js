// Integration code start
import React, { useState } from 'react';

const Flights = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [passengerType, setPassengerType] = useState('adult');
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setOffers([]);

        const data = {
            slices: [
                {
                    origin: origin,
                    destination: destination,
                    departure_date: departureDate
                }
            ],
            passengers: [
                {
                    type: passengerType
                }
            ]
        };

        try {
            const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch flight offers');
            }

            const result = await response.json();
            setOffers(result.offers || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="search-area">
                <div className="search">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Origin"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            placeholder="Departure Date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            required
                        />
                        <select
                            value={passengerType}
                            onChange={(e) => setPassengerType(e.target.value)}
                        >
                            <option value="adult">Adult</option>
                            <option value="child">Child</option>
                            <option value="infant_without_seat">Infant without seat</option>
                        </select>
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>
            </div>
            {loading && <div className="loading-indicator">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            <ul>
                {offers.map((offer) => (
                    <li key={offer.id} className="offer-item">
                        <p className="operator-name">{offer.carrier.name}</p>
                        <div>
                            <p className="departing-at">{new Date(offer.slices[0].departing_at).toLocaleString()}</p>
                            <p className="origin-name">{offer.slices[0].origin.name}</p>
                        </div>
                        <p className="duration">{offer.duration}</p>
                        <div>
                            <p className="arriving-at">{new Date(offer.slices[0].arriving_at).toLocaleString()}</p>
                            <p className="destination-name">{offer.slices[0].destination.name}</p>
                        </div>
                        <div>
                            <p className="total-amount">{offer.total_amount} {offer.total_currency}</p>
                            <button className="select-button">Select</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Flights;
// Integration code end
