import axios from "axios";

export const getCoordinatesService = async (cityName, countryCode) => {

    const apiKey = "459cca26b4ba50c549c3ef7e5680796d";
    const apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=${apiKey}`;

    try {
        const coordinatesResponse = await axios.get(apiURL);
        const result = [coordinatesResponse.data[0].lat, coordinatesResponse.data[0].lon];
        console.log(result)
        return result;
    } catch (e) {
        return e.message;
    }
}

export default getCoordinatesService;

getCoordinatesService("dublin", "IE");