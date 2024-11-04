const CarRentals = () => {
  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input className="origin" placeholder="Origin" />
          <input className="destination" placeholder="Destination" />
          <input className="date-from" type="date"/>
          <input className="date-to" type="date"/>
          <button>Search</button>
        </div>
      </div>
      {/* Response items go in this container */}
      <ul>
        <li className="search-response-item">
          <p className="status">status</p>
          <p className="capacity">capacity</p>
          <p className="beds">beds</p>
          <p className="price-per-day">price-per-day</p>
          <p className="total-price">
            total price<span className="currency">currency</span>
          </p>
          <button className="select-button">Select</button>
        </li>
      </ul>
    </div>
  );
};

export default CarRentals;
