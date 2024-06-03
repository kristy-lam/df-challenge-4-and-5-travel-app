import axios from "axios";

const getLocationsService = async (citySearchInput) => {
  const apiKey = "459cca26b4ba50c549c3ef7e5680796d";
  const apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearchInput}&limit=5&appid=${apiKey}`;

  try {
    const response = await axios.get(apiURL);
    const locationsResponse = response.data;

    const locations = locationsResponse.map(location => ({
      city: location.name,
      state: location.state || "N/A",
      country: location.country
    }));

    return locations;
  } catch (e) {
    console.error(e.message);
    return [];
  }
};

export default getLocationsService;
