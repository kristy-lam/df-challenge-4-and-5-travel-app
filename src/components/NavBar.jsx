import Dropdown from "./Dropdown";
import Login from "./Login";
import SearchBar from "./SearchBar";

const NavBar = ({
  citySearchInput,
  setCitySearchInput,
  locations,
  isHomePage,
}) => {
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
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#FF9F1C", color: "#FFFFFF" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Login
              </button>
              <Login />
            </li>
            {isHomePage && <Dropdown />}
          </ul>
          {!isHomePage && (
            <SearchBar
              citySearchInput={citySearchInput}
              setCitySearchInput={setCitySearchInput}
              locations={locations}
              isHomePage={isHomePage}
              parent="NavBar"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
