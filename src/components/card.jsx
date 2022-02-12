import React from "react";
import { getIconLink } from "../helper";
import "./card.css";
export const Card = ({ item, index }) => {
  const { wind_speed, wind_deg, wind_gust, pressure, humidity, weather, temp, dt } = item
  const date = new Date()
  // this api return datapoint, not timestamp, so this is just a work around
  date.setDate(date.getDate() + index + 1)
  const [currentWeather] = weather
  return (
    <div className="card">
      <p>{date.toUTCString()}</p>
      <p>{`${currentWeather.main}: ${currentWeather.description}`}</p>
      <p className="card-sub">
        <span>
          Wind {wind_speed}km/h
        </span>
        <span>
         Gust: {wind_gust}
        </span>
        <span>
          Degree: {wind_deg}°
        </span>
      </p>
      <img src={getIconLink(item.weather[0].icon)} alt="main-weather" />
      <p className="temp_min">Temp Min: {temp.min} °C </p>
      <p className="temp_max">Temp Max: {temp.max} °C</p>
      <p className="temp">Current Temp: {temp.day} °C</p>
      <p className="temp">Humidity: {humidity}%</p>
      <p className="temp">Air Pressure: {pressure} hPa</p>
    </div>
  );
};
