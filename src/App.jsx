import { useEffect, useState } from "react";
import getLocationsService from "./utils/getLocations.js";

import Footer from "./components/Footer";
import HomeSearchSec from "./components/HomeSearchSec";
import NavBar from "./components/NavBar";

import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

const App = () => {
  const [citySearchInput, setCitySearchInput] = useState("");
  const [locations, setLocations] = useState([]);
  const pageLocation = useLocation();
  const isHomePage = pageLocation.pathname === "/";

  const getLocations = async (city) => {
    if (city) {
      const locations = await getLocationsService(city);
      setLocations(Array.isArray(locations) ? locations : []);
    } else {
      setLocations([]);
    }
  };

  useEffect(() => {
    if (citySearchInput) {
      getLocations(citySearchInput);
    } else {
      setLocations([]);
    }
  }, [citySearchInput]);

  useEffect(() => {
    const pathName = pageLocation.pathname;
    let pageTitle = "DF Travel - Home";
    if (pathName.startsWith("/location"))
      pageTitle = "DF Travel - Tell Me About...";
    if (pathName.startsWith("/saved"))
      pageTitle = "DF Travel - My Saved Locations";
    document.title = pageTitle;
  }, [pageLocation]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="bg d-flex flex-column min-vh-100">
              <NavBar
                citySearchInput={citySearchInput}
                setCitySearchInput={setCitySearchInput}
                locations={locations}
                isHomePage={isHomePage}
              />
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                <HomeSearchSec
                  citySearchInput={citySearchInput}
                  setCitySearchInput={setCitySearchInput}
                  locations={locations}
                />
              </div>
              <Footer />
            </div>
          </>
        }
      ></Route>
    </Routes>
  );
};

export default App;
