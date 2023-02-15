import React from "react";

export default function MainDetailArea({ data, temp_unit }) {
  return (
    <div className="main-details center">
      <div className="description-box center">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
        <p>{data.weather[0].description}</p>
      </div>

      <div className="temperature-box">
        <h1>{data.main.temp} </h1>{" "}
        {temp_unit === "c" ? <span> &#8451; </span> : <span> &#8457; </span>}
      </div>
    </div>
  );
}
