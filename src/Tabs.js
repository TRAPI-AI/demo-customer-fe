const Tabs = ({ setActiveTab, activeTab }) => {
  return (
    <div
      style={{
        backgroundColor: "rgb(0, 59, 149)",
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
        gap: 20,
        paddingBottom: 10,
      }}
    >
      <div
        style={{
          border: activeTab === "Flights" ? "1px solid white" : "1px solid transparent",
          borderRadius: 50,
          padding: "17px 22px",
          color: "white",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex", // Ensure the contents of the div are laid out in a row
          alignItems: "center", // Align the image and text vertically
          backgroundColor:
            activeTab === "Flights"
              ? "rgba(255, 255, 255, 0.18)"
              : "transparent", // Very transparent white
        }}
        onClick={() => setActiveTab("Flights")}
      >
        <img src="/Air.png" alt="Air" style={{ marginRight: 12, height: 25 }} />
        Flights
      </div>
      <div
        style={{
          border: activeTab === "Stays" ? "1px solid white" : "1px solid transparent",
          borderRadius: 50,
          padding: "17px 22px",
          color: "white",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex", // Ensure the contents of the div are laid out in a row
          alignItems: "center", // Align the image and text vertically
          backgroundColor:
            activeTab === "Stays" ? "rgba(255, 255, 255, 0.18)" : " transparent", // Very transparent white
        }}
        onClick={() => setActiveTab("Stays")}
      >
        <img
          src="/Beds.png"
          alt="Air"
          style={{ marginRight: 12, height: 25 }}
        />
        Stays
      </div>
      <div
        style={{
          border: activeTab === "Cruises" ? "1px solid white" : "1px solid transparent",
          borderRadius: 50,
          padding: "17px 22px",
          color: "white",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex", // Ensure the contents of the div are laid out in a row
          alignItems: "center", // Align the image and text vertically
          backgroundColor:
            activeTab === "Cruises"
              ? "rgba(255, 255, 255, 0.18)"
              : "transparent", // Very transparent white
        }}
        onClick={() => setActiveTab("Cruises")}
      >
        <img
          src="/Cruise.png"
          alt="Air"
          style={{ marginRight: 12, height: 25 }}
        />
        Cruises
      </div>
      <div
        style={{
          border:
            activeTab === "Trains" ? "1px solid white" : "1px solid transparent",
          borderRadius: 50,
          padding: "17px 22px",
          color: "white",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex", // Ensure the contents of the div are laid out in a row
          alignItems: "center", // Align the image and text vertically
          backgroundColor:
            activeTab === "Trains"
              ? "rgba(255, 255, 255, 0.18)"
              : "transparent", // Very transparent white
        }}
        onClick={() => setActiveTab("Trains")}
      >
        <img src="/Train.png" alt="Air" style={{ marginRight: 12, height: 25 }} />
        Trains
      </div>
      <div
        style={{
          border:
            activeTab === "Car Rentals" ? "1px solid white" : "1px solid transparent",
          borderRadius: 50,
          padding: "17px 22px",
          color: "white",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex", // Ensure the contents of the div are laid out in a row
          alignItems: "center", // Align the image and text vertically
          backgroundColor:
            activeTab === "Car Rentals"
              ? "rgba(255, 255, 255, 0.18)"
              : "transparent", // Very transparent white
        }}
        onClick={() => setActiveTab("Car Rentals")}
      >
        <img src="/Car.png" alt="Air" style={{ marginRight: 12, height: 25 }} />
        Car Rentals
      </div>
      <div
        style={{
          border: activeTab === "eSims" ? "1px solid white" : "transparent",
          borderRadius: 50,
          padding: "17px 22px",
          color: "white",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex", // Ensure the contents of the div are laid out in a row
          alignItems: "center", // Align the image and text vertically
          backgroundColor:
            activeTab === "eSims" ? "rgba(255, 255, 255, 0.18)" : "transparent", // Very transparent white
        }}
        onClick={() => setActiveTab("eSims")}
      >
        <img src="/Sim.png" alt="Air" style={{ marginRight: 12, height: 25 }} />
        eSims
      </div>
    </div>
  );
};

export default Tabs;
