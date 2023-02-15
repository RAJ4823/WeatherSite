import React from "react";

export default function ForecastArea({ data, timezone, temp_unit }) {
  const localTime = new Date(data.list[0].dt * 1000);
  const today = getLocalDate(localTime, timezone);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return (
    <div className="forecast-info center">
      <h2 className="title">
        Forecast for{" "}
        {today.toLocaleString("en", {
          weekday: "long",
        })}
      </h2>
      <div className="hourly-weather-list">
        {data.list.map((item, index) => (
          <HourlyWeather
            data={item}
            key={index}
            date={today.getDate()}
            timezone={timezone}
            temp_unit={temp_unit}
          />
        ))}
      </div>
      <h2 className="title">
        Forecast for{" "}
        {tomorrow.toLocaleString("en", {
          weekday: "long",
        })}
      </h2>
      <div className="hourly-weather-list">
        {data.list.map((item, index) => (
          <HourlyWeather
            data={item}
            key={index}
            date={tomorrow.getDate()}
            timezone={timezone}
            temp_unit={temp_unit}
          />
        ))}
      </div>
    </div>
  );
}

function HourlyWeather({ data, date, timezone, temp_unit }) {
  const localTime = new Date(data.dt * 1000);
  const currentDate = getLocalDate(localTime, timezone);
  if (date !== currentDate.getDate()) return;
  const time = currentDate.toLocaleTimeString("en", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="hourly-weather-item">
      <p className="time">{time}</p>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="Weather Icon"
      />
      <p className="description">{data.weather[0].description}</p>
      <p className="temp">
        {data.main.temp}{" "}
        {temp_unit === "c" ? <span> &#8451; </span> : <span> &#8457; </span>}
      </p>
    </div>
  );
}

// For converting local time to UTC date by given timezone
function getLocalDate(date, timezone) {
  const utcDate = date.getTime() + date.getTimezoneOffset() * 60000;
  const localDate = utcDate + timezone * 1000;
  return new Date(localDate);
}
