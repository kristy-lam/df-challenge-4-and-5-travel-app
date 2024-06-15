import axios from "axios";

export const getWeatherService = async (coordinates) => {
  const apiKey = "459cca26b4ba50c549c3ef7e5680796d";
  const URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${apiKey}&units=metric`;

  try {
    const weatherDataResponse = await axios.get(URL);
    return weatherDataResponse.data;
  } catch (e) {
    return e.message;
  }
};

export default getWeatherService;
