const CarRentals = () => {
  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input className="origin" placeholder='Origin' />
          <input className="destination" />
          <input />
          <button>Search</button>
        </div>
      </div>
      {/* Response items go in this container */}
      <ul>
        <li className="offer-item"></li>
        <li className="offer-item"></li>
      </ul>
    </div>
  );
};

export default CarRentals;
