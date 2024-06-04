import { useEffect, useState } from "react";
import getCoordinatesService from "./utils/getCoordinates.js";
import getLocationsService from "./utils/getLocations.js";
import getWeatherService from "./utils/getWeather.js";
import formatCoordinatesData from "./utils/formatCoordinatesData.js";
import formatLocationsData from "./utils/formatLocationsData.js";
import formatWeatherData from "./utils/formatWeatherData.js";

import FavSec from "./components/FavSec";
import Footer from "./components/Footer";
import HomeSearchSec from "./components/HomeSearchSec";
import NavBar from "./components/NavBar";
import TellMeAboutSec from "./components/TellMeAboutSec.jsx";

import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

const App = () => {
  const [citySearchInput, setCitySearchInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const pageLocation = useLocation();
  const isHomePage = pageLocation.pathname === "/";

  // State to get locations from Geocoding API
  const getLocations = async (city) => {
    const locations = await getLocationsService(city);
    const formattedLocations = formatLocationsData(locations);
    setLocations(Array.isArray(formattedLocations) ? formattedLocations : []);
  };

  useEffect(() => {
    if (citySearchInput) {
      getLocations(citySearchInput);
    } else {
      setLocations([]);
    }
  }, [citySearchInput]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (citySearchInput) {
        const coordinates = await getCoordinatesService(citySearchInput);
        const formattedCoordinates = formatCoordinatesData(coordinates);
        const forecast = await getWeatherService(formattedCoordinates);
        const formattedForecast = formatWeatherData(forecast);
        setFiveDayForecast(formattedForecast);
      }
    };
    fetchWeatherData();
  }, [citySearchInput]);

  useEffect(() => {
    const pathName = pageLocation.pathname;
    let pageTitle = "DF Travel - Home";
    if (pathName.startsWith("/location/"))
      pageTitle = "DF Travel - Tell Me About...";
    if (pathName.startsWith("/fav"))
      pageTitle = "DF Travel - My Saved Locations";
    document.title = pageTitle;
  }, [pageLocation]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="bg-all d-flex flex-column min-vh-100">
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
      <Route
        path="/location"
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
                <TellMeAboutSec
                  citySearchInput={citySearchInput}
                  setCitySearchInput={setCitySearchInput}
                  locations={locations}
                  fiveDayForecast={fiveDayForecast}
                />
              </div>
              <Footer />
            </div>
          </>
        }
      ></Route>
      <Route
        path="/fav"
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
                <FavSec />
              </div>
              <Footer />
            </div>
          </>
        }
      ></Route>
      <Route path="*" element={<p>Your 404 component</p>} />
    </Routes>
  );
};

export default App;
