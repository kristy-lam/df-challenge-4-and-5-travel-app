export const formatWeatherData = (data) => {
  const getForecast = (listIndex) => {
    const getCoord = data.city.coord.lat + ", " + data.city.coord.lon;
    const getUTCStamp = data.list[listIndex].dt;

    // Create date in format as stated in wire frame
    const rawDate = new Date(getUTCStamp * 1000);
    const format = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const formattedDate = rawDate.toLocaleDateString("en-GB", format);
    let date = formattedDate.slice(5, 7);
    let dateSuffix = "th";
    if (date === "01" || date === "21" || date === "31") dateSuffix = "st";
    if (date === "02" || date === "22") dateSuffix = "nd";
    if (date === "03" || date === "23") dateSuffix = "rd";
    date = date.replace(/^0+/, "");
    const displayDate =
      formattedDate.slice(0, 5) + date + dateSuffix + formattedDate.slice(7);

    // Extract data required for display
    const getTemp = data.list[listIndex].main.temp;
    const tempText = getTemp + "\u2103";
    const getIconID = data.list[listIndex].weather[0].icon;
    const iconPath = `/assets/weather-icons/${getIconID}.svg`;
    const getDesc = data.list[listIndex].weather[0].description;
    const forecast = {
      coord: getCoord,
      date: displayDate,
      temp: tempText,
      icon: iconPath,
      desc: getDesc,
    };
    return forecast;
  };

  // There are 8 forecasts at different times of the same day,
  // hence the index is adding up by 8.
  const fiveDayForecast = [
    getForecast(0),
    getForecast(8),
    getForecast(16),
    getForecast(24),
    getForecast(32),
  ];

  return fiveDayForecast;
};

export default formatWeatherData;
