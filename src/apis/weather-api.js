import axios from "axios";

const API_URL_FORECAST =
  "https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly,alerts&appid=c544f23936458d2144e4820488f1c77c&units=metric&cnt=5";

const API_URL_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?appid=c544f23936458d2144e4820488f1c77c&units=metric";

export const callForecastAPIByGeo = ({ latitude, longitude }) => {
  return axios
    .get(`${API_URL_FORECAST}&lon=${longitude}&lat=${latitude}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return [{ daily: [] }];
    });
};

export const callWeatherAPIByGeo = ({ latitude, longitude }) => {
  return axios
    .get(`${API_URL_WEATHER}&lon=${longitude}&lat=${latitude}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return [{ daily: [] }];
    });
};
export const callWeatherAPIByCity = ({ cityName }) => {
  return axios
    .get(`${API_URL_WEATHER}&q=${cityName}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return null;
    });
};
