import axios from "axios";

const getLocationsService = async (citySearchInput) => {
  const apiKey = "459cca26b4ba50c549c3ef7e5680796d";
  const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearchInput}&limit=5&appid=${apiKey}`;

  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export default getLocationsService;
