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
    </div>
  );
};

export default CarRentals;
