import FavDropdown from "./FavDropdown";
import LoginModal from "./LoginModal";
import SearchBar from "./SearchBar";
import RegisterModal from "./RegisterModal";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useUser } from "../context/context.js";

const NavBar = () => {
  const { pathname } = useLocation();
  const { isLoggedIn, setLoggedOut } = useUser();
  const isHomepage = useMemo(() => pathname === "/", [pathname]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
  }, [isLoggedIn]);

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
            {!isLoggedIn ? (
              <>
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
                  </>
                </li>
                <li className="d-flex p-2 nav-item">
                  <button
                    type="button"
                    className="btn"
                    style={{ backgroundColor: "#FF9F1C", color: "#FFFFFF" }}
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Login
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="d-flex p-2 nav-item">
                  <button
                    type="button"
                    className="btn"
                    style={{ backgroundColor: "#FF9F1C", color: "#FFFFFF" }}
                    onClick={() => setLoggedOut()}
                  >
                    Logout
                  </button>
                </li>
                {/* <FavDropdown /> */}
              </>
            )}
          </ul>
          <RegisterModal />
          <LoginModal />
          {!isHomepage && <SearchBar parent="NavBar" />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
