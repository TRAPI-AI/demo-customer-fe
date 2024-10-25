const Flights = () => {
  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input />
          <input />
          <input />
          <input />
          <button className="search-button">Search</button>
        </div>
      </div>
      {/* Response items go in this container */}
      <ul>
        <li className="offer-item">
          <p className="operator-name">name</p>
          <div>
            <p className="departing-at">departing at</p>
            <p className="origin-name">origin name</p>
          </div>
          <p className="duration">duration</p>
          <div>
            <p className="arriving-at">arriving at</p>
            <p className="destination-name">destination name</p>
          </div>
          <div>
            <p className="total-amount">amount</p>
            <button className="select-button">Select</button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Flights;
