const RideHailing = () => {
  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Search Request Input fields go in this container */}
          <input />
          <input />
          <input />
          <button>Search</button>
        </div>
      </div>
      {/* Search Response items go in this container*/}
      <ul>
        <li className="offer-item"></li>
      </ul>
      {/* Booking Response items go in this container */}
      <div className="booking-response">
        <p>Field 1</p>
        <p>Field 1</p>
        <p>Field 1</p>
      </div>
    </div>
  );
};

export default RideHailing;
