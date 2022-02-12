import React from "react";
import { getIconLink } from "../helper";
import "./card.css";

export const CardCity = ({ item }) => {
    const { main, name, visibility, wind, weather: [currentWeather] } = item
    const { speed, gust, deg } = wind
    const { temp, temp_min, temp_max, humidity, pressure } = main
  return (
    <div className="card_city">
      <p>{name}</p>
      <p>{`${currentWeather.main}: ${currentWeather.description}`}</p>
      <p className="card-sub">
        <span>
          Wind {speed}km/h
        </span>
        <span>
         Gust: {gust}
        </span>
        <span>
          Degree: {deg}°
        </span>
      </p>
      <img src={getIconLink(item.weather[0].icon)} alt="main-weather" />

      <p >Temp Min: {temp_min} °C </p>
      <p >Temp Max: {temp_max} °C</p>
      <p >Current Temp: {temp} °C</p>
      <p >Humidity: {humidity}%</p>
      <p >Air Pressure: {pressure} hPa</p>
      <p >Visibility: {visibility} (metres)</p>
    </div>
  );
};

