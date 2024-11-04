const CarRentals = () => {
  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input className="origin" placeholder="Origin" />
          <input className="destination" placeholder="Destination" />
          <input className="date-from" type="date" />
          <input className="date-to" type="date" />
          <button>Search</button>
        </div>
      </div>
      <ul>
        <li className="search-response-item">
          <img
            alt="Placeholder Image"
            className="vehicle-image"
          />
          <div>
            <p className="status"></p>
            <p className="capacity">Capacity: </p>
            <p className="beds">Beds:</p>
            <p className="price-per-day">Price-per-day:</p>
            <p className="total-price">
              Total price: <span className="currency"></span>
            </p>
          </div>
          <button className="select-button">Select</button>
        </li>
      </ul>
      <div className="booking-form">
          <h3>Enter Client Details</h3>
          <input placeholder="Name" />
          <input type="email" placeholder="Email"/>
          <input placeholder="Nationality" />
          <input placeholder="Phone Number" />
          <button>Book</button>
        </div>
  <div className="booking-confirmation">
        <h3>Booking Confirmation</h3>
        <p className="from-location">from:</p>
        <p className="to-location">to:</p>
        <p className="capacity">Capacity:</p>
        <p className="type">Type:</p>
      </div>
    </div>
  );
};

export default CarRentals;
