import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getLocationsService from "../services/getLocations.service.js";
import formatLocationsData from "../utils/formatLocationsData.js";

const SearchBar = ({ parent }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (value.trim()) {
      void getLocations(value.trim());
    }
  }, [value]);

  // Function to get locations from Geocoding API
  const getLocations = async (keyword) => {
    const locations = await getLocationsService(keyword);
    // Parse received data only when data is an array
    if (Array.isArray(locations)) {
      const formattedLocations = formatLocationsData(locations);
      setLocations(formattedLocations);
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    navigate(`/location/${encodeURIComponent(value.trim())}`);
  };

  // Styling for search bar when it appears in the Nav Bar outside Home page
  const brInNavBar = parent === "NavBar" ? "" : <br />;
  const formClassNameInNavBar = parent === "NavBar" ? "d-flex ms-auto p-2" : "";
  const buttonClassNameInNavBar = parent === "NavBar" ? "ms-1" : "";
  const buttonHTMLInNavBar =
    parent === "NavBar" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>
    ) : (
      "Search"
    );

  return (
    <form className={formClassNameInNavBar} onSubmit={handleOnSubmit}>
      <div className="form-group">
        <input
          className="form-control"
          list="locationsList"
          type="search"
          aria-label="Search"
          placeholder="Location name..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <datalist id="locationsList">
          {locations.map((location, index) => (
            <option
              key={index}
              value={`${location.city}, ${location.state}, ${location.country}`}
            />
          ))}
        </datalist>
      </div>
      <div className="form-group text-center">
        {brInNavBar}
        <button
          type="submit"
          className={`btn my-main-btn ${buttonClassNameInNavBar}`}
          style={{ backgroundColor: "#2EC4B6", color: "#FFFFFF" }}
        >
          {buttonHTMLInNavBar}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
