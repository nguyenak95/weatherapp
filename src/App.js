import { useEffect, useRef, useState } from "react";
import { callForecastAPIByGeo, callWeatherAPIByGeo } from "./apis";
import "./App.css";
import { Card, CardCity } from "./components";
import { SearchCity } from "./components/search-city";

function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

const App = () => {
  const [foreCastData, setForecast] = useState({ daily: [] });
  const [currentLocationData, setCurrentLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getLocation(async (position) => {
      const { latitude, longitude } = position.coords;
      await callWeatherAPIByGeo({ latitude, longitude }).then((data) => {
        setCurrentLocationData(data);
      });
      await callForecastAPIByGeo({ latitude, longitude }).then((data) => {
        setForecast(data);
      });
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <h1>Weather App</h1>
      {isLoading ? (
        <div>LOADING</div>
      ) : (
        <>
          {!!currentLocationData && (
            <h2>Current Location: {currentLocationData.name}</h2>
          )}
          {currentLocationData ? (
            <div className="daily_weather">
              <CardCity item={currentLocationData} />
            </div>
          ) : null}
          <h3>Forecast 5 days of current location</h3>
          <div className="daily_weather">
            {foreCastData.daily.slice(0, 5).map((item, index) => (
              <Card item={item} index={index} key={item.dt} />
            ))}
          </div>
          <SearchCity />
        </>
      )}
    </div>
  );
};

export default App;
