import "./TellMeAboutSec.css";

import WeatherDisplay from "./WeatherDisplay";

const TellMeAboutSec = ({ citySearchInput, fiveDayForecast }) => {
  return (
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <h3>Tell me about...</h3>
          <h1>{citySearchInput}</h1>
          <button name={fiveDayForecast[0].coord}>
            Click to add to favourites
            <img
              src="/assets/bookmark-icon.svg"
              alt="bookmark"
              style={{ width: "15px", height: "18px" }}
            />
          </button>
        </div>
      </div>
      <div className="todayDisplay">
        <div class="row">
          <div class="col">
            <p>Today's weather:</p>
            <p className="todayDate">{fiveDayForecast[0].date}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-4 col-md-6">
            <img
              className="todayIcon"
              src={fiveDayForecast[0].icon}
              alt={`icon: ${fiveDayForecast[0].desc}`}
            />
          </div>
          <div class="col-4 col-md-3">
            <p className="todayTemp">{fiveDayForecast[0].temp}</p>
          </div>
          <div class="col-4 col-md-3">
            <p className="todayDesc">{fiveDayForecast[0].desc}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="smallDisplay col-6 col-md-3">
          <WeatherDisplay forecast={fiveDayForecast[1]} />
        </div>
        <div class="smallDisplay col-6 col-md-3">
          <WeatherDisplay forecast={fiveDayForecast[2]} />
        </div>
        <div class="smallDisplay col-6 col-md-3">
          <WeatherDisplay forecast={fiveDayForecast[3]} />
        </div>
        <div class="smallDisplay col-6 col-md-3">
          <WeatherDisplay forecast={fiveDayForecast[4]} />
        </div>
      </div>
    </div>
  );
};

export default TellMeAboutSec;
