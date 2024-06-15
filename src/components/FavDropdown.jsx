import { useNavigate } from "react-router-dom";
import { useUser } from "../context/context.js";

const FavDropdown = () => {
  const navigate = useNavigate();
  const { favs } = useUser();

  const handleOnClick = (city) => {
    navigate(`/location/${encodeURIComponent(city.trim())}`);
  };

  return (
    <li className="d-flex p-2 nav-item dropdown">
      <a
        className="nav-link"
        aria-current="page"
        style={{
          cursor: "pointer",
        }}
        onClick={() => navigate("/fav")}
      >
        My Saved Locations
      </a>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      ></a>

      <ul className="dropdown-menu">
        {favs.map((fav, index) => (
          <li key={index}>
            <button
              className="dropdown-item"
              onClick={() => handleOnClick(fav.city)}
            >
              {fav.city}
            </button>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default FavDropdown;
