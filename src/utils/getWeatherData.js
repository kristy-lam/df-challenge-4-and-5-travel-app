import axios from "axios";

export const getWeatherDataService = async (coordinates) => {

    const apiKey = "459cca26b4ba50c549c3ef7e5680796d";
    const apiURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${apiKey}&units=metric`;

    try {
        const weatherDataResponse = await axios.get(apiURL);

        const getForecast = (listIndex) => {
            const getDateTimeText = weatherDataResponse.data.list[listIndex].dt_txt;
            const getDate = getDateTimeText.slice(0, 10);
            const getTemp = weatherDataResponse.data.list[listIndex].main.temp;
            const getIconID = weatherDataResponse.data.list[listIndex].weather[0].icon;
            const getDesc = weatherDataResponse.data.list[listIndex].weather[0].description;            
            const forecast = {
                date: getDate,
                temp: getTemp,
                iconID: getIconID,
                desc: getDesc
            }
            return forecast;
        }

        // There are 8 forecasts at different times of the same day, 
        // hence the index is adding up by 8.
        const todayForecast = getForecast(0);
        const day2Forecast = getForecast(8);
        const day3Forecast = getForecast(16);
        const day4Forecast = getForecast(24);
        const day5Forecast = getForecast(32);

        const fiveDayForecast = [todayForecast,
            day2Forecast,
            day3Forecast,
            day4Forecast,
            day5Forecast
        ]
        console.log(fiveDayForecast);

    } catch (e) {
        return e.message;
    }
}

export default getWeatherDataService;

const dublinCoordinates = [53.3498006, -6.2602964];
getWeatherDataService(dublinCoordinates);
