import React from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import LocalDateAndTime from "./LocalDateAndTime";
import MainDetailArea from "./MainDetailArea";
import MoreDetailArea from "./MoreDetailArea";
import ForecastArea from "./ForecastArea";
import "./weather-info-area.css";

const TimeFormat = { minute: "numeric", hour: "numeric" };

export default function WeatherInfoArea({ currentWeather, hourlyForecast }) {
  const tempUnit = localStorage.getItem("temp_unit") || "c";
  return (
    <div className="weather-info-area">
      <LocalDateAndTime timezone={currentWeather.timezone} />
      <div className="current-weather-info">
        <MainDetailArea data={currentWeather} temp_unit={tempUnit} />
        <hr className="vline" />
        <MoreDetailArea data={currentWeather} />
      </div>
      <hr className="hline" />
      <ForecastArea
        data={hourlyForecast}
        timezone={currentWeather.timezone}
        temp_unit={tempUnit}
      />
      <LastUpdatedTime data={currentWeather} />
    </div>
  );
}

// The last time when api is updated
function LastUpdatedTime({ data }) {
  const lastUpdatedTime = new Date(data.dt * 1000).toLocaleTimeString(
    "en",
    TimeFormat
  );
  return (
    <p className="last-updated-time">
      Last Updated : <span>{lastUpdatedTime}</span>
    </p>
  );
}
