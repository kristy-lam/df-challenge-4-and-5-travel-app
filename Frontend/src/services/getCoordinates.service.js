import axios from "axios";

export const getCoordinatesService = async (
  cityName,
  stateName,
  countryCode
) => {
  let commaAfterState = ",";
  if ((stateName = "N/A")) {
    commaAfterState = "";
    stateName = "";
  }

  const apiKey = "459cca26b4ba50c549c3ef7e5680796d";
  const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName}${commaAfterState}${countryCode}&limit=1&appid=${apiKey}`;

  try {
    const coordinatesResponse = await axios.get(URL);
    return coordinatesResponse.data;
  } catch (e) {
    return e.message;
  }
};

export default getCoordinatesService;
