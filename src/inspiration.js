import "./App.css";

const Inspiration = () => {
  return (
    <div>
      <div className="inspiration">
        <div className="inspiration-header">
          Inspiration for future getaways
        </div>
        <div>
          <ul className="inspiration-list">
            <li className="inspiration-item">
              <img
                src="https://images.unsplash.com/photo-1633847016580-b7a15cc813d7?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="La Sagrada Familia, Barcelona"
              />
            </li>
            <li className="inspiration-item">
              <img
                src="https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="La Sagrada Familia, Barcelona"
              />
            </li>{" "}
            <li className="inspiration-item">
              <img
                src="https://images.unsplash.com/photo-1636728150922-e7361791595a?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="La Sagrada Familia, Barcelona"
              />
            </li>{" "}
            <li className="inspiration-item">
              <img
                src="https://images.unsplash.com/photo-1557188969-16b469a5b6c2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="La Sagrada Familia, Barcelona"
              />
            </li>
          </ul>
        </div>
      </div>
      <footer style={{ height: "100px", paddingTop: 60 }}>
        <span>Demo Travel Tool</span>
      </footer>
    </div>
  );
};

export default Inspiration;
