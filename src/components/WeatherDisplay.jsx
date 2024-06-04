const WeatherDisplay = ({ forecast }) => {
  return (
    <div className="container">
      <p className="forecastDate">{forecast.date}</p>
      <img
        className="forecastIcon"
        src={forecast.icon}
        alt={`icon: ${forecast.desc}`}
      />
      <p className="forecastTemp">{forecast.temp}</p>
      <p className="forecastDesc">{forecast.desc}</p>
    </div>
  );
};

export default WeatherDisplay;
