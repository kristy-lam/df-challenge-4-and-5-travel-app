import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BookmarkButton from "../components/BookmarkButton.jsx";
import MainLayout from "../components/MainLayout.jsx";
import WeatherDisplay from "../components/WeatherDisplay.jsx";

import formatCoordinatesData from "../utils/formatCoordinatesData.js";
import formatWeatherData from "../utils/formatWeatherData.js";
import getCoordinatesService from "../services/getCoordinates.service.js";
import getWeatherService from "../services/getWeather.service.js";

const TellMeAboutSec = ({ isLoggedIn }) => {
  const { keyword } = useParams();
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  useEffect(() => {
    if (keyword) {
      const parsedKeyword = decodeURIComponent(keyword);
      setCity(parsedKeyword);
      void fetchWeatherData(parsedKeyword);
    }
  }, [keyword]);

  const fetchWeatherData = async (keyword) => {
    try {
      setIsLoading(true);
      const coordinates = await getCoordinatesService(keyword);
      // Stop the fetch weather flow if no coordinate is found
      if (!coordinates?.length) {
        throw new Error("Could not find coordinates");
      }
      const formattedCoordinates = formatCoordinatesData(coordinates);
      const forecast = await getWeatherService(formattedCoordinates);
      const formattedForecast = formatWeatherData(forecast);
      setFiveDayForecast(formattedForecast);
    } catch (e) {
      console.error(e);
      setFiveDayForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container text-center todayDisplay">
        <div className="row">
          <div className="col">
            <h3>{isLoading ? "Loading..." : "Tell me about..."}</h3>
            <h1>{city}</h1>
            {/* {isLoggedIn && <BookmarkButton city={city} />} */}
            <BookmarkButton city={city} />
          </div>
        </div>
        {!!fiveDayForecast.length && (
          <>
            <div className="todayDisplay">
              <div className="row">
                <div className="col">
                  <p>Today&apos;s weather:</p>
                  <p className="todayDate">{fiveDayForecast[0].date}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4 col-md-6">
                  <img
                    className="todayIcon"
                    src={fiveDayForecast[0].icon}
                    alt={`icon: ${fiveDayForecast[0].desc}`}
                  />
                </div>
                <div className="col-4 col-md-3">
                  <p className="todayTemp">{fiveDayForecast[0].temp}</p>
                </div>
                <div className="col-4 col-md-3">
                  <p className="todayDesc">{fiveDayForecast[0].desc}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="smallDisplay col-6 col-md-3">
                <WeatherDisplay forecast={fiveDayForecast[1]} />
              </div>
              <div className="smallDisplay col-6 col-md-3">
                <WeatherDisplay forecast={fiveDayForecast[2]} />
              </div>
              <div className="smallDisplay col-6 col-md-3">
                <WeatherDisplay forecast={fiveDayForecast[3]} />
              </div>
              <div className="smallDisplay col-6 col-md-3">
                <WeatherDisplay forecast={fiveDayForecast[4]} />
              </div>
            </div>
          </>
        )}
        {!fiveDayForecast.length && (
          <div className="row">
            <div className="col">
              <h4>Failed to load the weather.</h4>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TellMeAboutSec;
