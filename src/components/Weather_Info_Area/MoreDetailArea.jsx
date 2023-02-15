import React from "react";

export default function MoreDetailArea({ data }) {
  return (
    <div className="more-details center">
      <div className="detail">
        Humidity
        <p className="value">{data.main.humidity + " %"}</p>
      </div>
      <div className="detail">
        Wind Speed
        <p className="value">{data.wind.speed + " m/s"}</p>
      </div>
      <div className="detail">
        Pressure
        <p className="value">{data.main.pressure + " hPa"}</p>
      </div>
      <div className="detail">
        Visibility
        <p className="value">{data.visibility / 1000 + " km"}</p>
      </div>
      <SunriseAndSunset data={data} />
    </div>
  );
}

function SunriseAndSunset({ data }) {
  const TimeFormat = { minute: "numeric", hour: "numeric" };
  const sunriseTime = getLocalDate(
    data.sys.sunrise,
    data.timezone
  ).toLocaleTimeString("en", TimeFormat);

  const sunsetTime = getLocalDate(
    data.sys.sunset,
    data.timezone
  ).toLocaleTimeString("en", TimeFormat);

  return (
    <div className="sunrise-sunset">
      <div className="sunrise-box">
        <p>{sunriseTime}</p>
        <img src="/WeatherSite/img/icons/sunrise.png" alt="sunrise" />
      </div>

      <div className="sunset-box">
        <img src="/WeatherSite/img/icons/sunset.png" alt="sunrise" />
        <p>{sunsetTime}</p>
      </div>
    </div>
  );
}

// For converting local time to UTC date by given timezone
function getLocalDate(localTime, timezone) {
  const date = new Date(localTime * 1000);
  const utcDate = date.getTime() + date.getTimezoneOffset() * 60000;
  const localDate = utcDate + timezone * 1000;
  return new Date(localDate);
}
