// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import getAllFavsService from "../services/getAllFavs.service.js";

const FavDropdown = () => {
  // const [favs, setFavs] = useState([]);
  // const navigate = useNavigate;

  // const fetchFavs = async () => {
  //   try {
  //     const favData = await getAllFavsService();
  //     setFavs(favData);
  //   } catch (e) {
  //     return e.message;
  //   }
  // };

  // useEffect(() => {
  //   fetchFavs();
  // }, []);

  // const handleOnClick = (city) => {
  //   navigate(`/location/${encodeURIComponent(city.trim())}`);
  // };

  return (
    <li className="d-flex p-2 nav-item dropdown">
      <a className="nav-link" aria-current="page" href="/fav">
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
        {/* {favs.map((fav, index) => (
          <li key={index}>
            <button
              className="dropdown-item"
              // onClick={() => {
              //   handleOnClick(fav.city);
              // }}
            >
              {fav.city}
            </button>
          </li>
        ))} */}
      </ul>
    </li>
  );
};

export default FavDropdown;
