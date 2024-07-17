import { faList, faMap, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleBookingsClick = () => {
    navigate("/bookings");
  };

  const handleMapClick = () => {
    navigate("/map");
  };

  return (
    <nav className="px-28 py-4">
      <span className="text-2xl">Demo Travel Tool</span>
      <div style={{ display: "flex", gap: 30, marginRight: 20 }}>
        <div
          className="cursor-pointer flex items-center font-bold gap-4"
          onClick={handleSearchClick}
        >
          <FontAwesomeIcon size="xl" icon={faSearch} />
          <div>Search</div>
        </div>
        <div
          className="cursor-pointer flex items-center font-bold gap-4"
          onClick={handleBookingsClick}
        >
          <FontAwesomeIcon size="xl" icon={faList} />
          <div className="">Bookings</div>
        </div>
        <div
          className="cursor-pointer flex items-center font-bold gap-4"
          onClick={handleMapClick}
        >
          <FontAwesomeIcon size="xl" icon={faMap} />
          <div className="">Map</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
