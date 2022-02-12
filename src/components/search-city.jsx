import { useEffect, useState, useRef } from "react";
import { CardCity } from ".";
import { callWeatherAPIByCity } from "../apis";
import useDebounce from "../hooks/useDebounce";

export const SearchCity = () => {
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");
  const [cityData, setCityData] = useState(null);
  const debouncedCity = useDebounce(cityName, 700);

  useEffect(() => {
    if (debouncedCity === "") {
      setError("");
      return;
    }
    callWeatherAPIByCity({ cityName: debouncedCity }).then((data) => {
      if (data) {
        setCityData(data);
      } else {
        setError("City not found");
      }
    });
  }, [debouncedCity]);

  const handleSearch = (e) => {
    setCityName(e.target.value);
  };
  return (
    <div>
      <label htmlFor="cityName">Search City's Weather</label>
      <input
        id="cityName"
        placeholder="Input City Name"
        value={cityName}
        onChange={handleSearch}
      />
      {error ? (
        <div style={{ margin: "2rem", color: "red"}}>{error}</div>
      ) : (
        <div className="daily_weather">
          {!!cityData && <CardCity item={cityData} />}
        </div>
      )}
    </div>
  );
};
