import FavDropdown from "./FavDropdown";
import getAllFavsService from "../services/getAllFavs.service.js";
import Login from "./Login";
import SearchBar from "./SearchBar";
import Register from "./Register";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

const NavBar = ({
  isLoggedIn,
  setIsLoggedIn,
  isRegistered,
  setIsRegistered,
}) => {
  const { pathname } = useLocation();
  const isHomepage = useMemo(() => pathname === "/", [pathname]);

  const [favAvailable, setFavAvailable] = useState(false);

  useEffect(() => {
    const fetchFavs = async () => {
      const favs = await getAllFavsService();
      if (favs.length > 0) setFavAvailable(true);
    };
    fetchFavs();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid" style={{ backgroundColor: "#ffffff" }}>
        <img
          className="navbar-brand"
          src="/assets/logo.png"
          alt="Logo"
          width="115"
          height="140"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="d-flex p-2 nav-item">
              <a className="nav-link" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="d-flex p-2 nav-item">
              <>
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#FF9F1C", color: "#FFFFFF" }}
                  data-bs-toggle="modal"
                  data-bs-target="#registerModal"
                >
                  Register
                </button>
                <Register
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  isRegistered={isRegistered}
                  setIsRegistered={setIsRegistered}
                />
              </>
            </li>
            <li className="d-flex p-2 nav-item">
              {!isLoggedIn ? (
                <>
                  <button
                    type="button"
                    className="btn"
                    style={{ backgroundColor: "#FF9F1C", color: "#FFFFFF" }}
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Login
                  </button>
                  <Login
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                </>
              ) : (
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#FF9F1C", color: "#FFFFFF" }}
                  onClick={() => setIsLoggedIn(false)}
                >
                  Logout
                </button>
              )}
            </li>
            {/* {isLoggedIn && favouriteAvailable && <FavDropdown />} */}
            {favAvailable && <FavDropdown />}
          </ul>
          {!isHomepage && <SearchBar parent="NavBar" />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
