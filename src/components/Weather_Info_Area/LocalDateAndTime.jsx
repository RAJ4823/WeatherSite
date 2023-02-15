import React, { useState } from "react";

const DateFormat = {
  weekday: "long",
  month: "short",
  day: "numeric",
  second: "numeric",
  minute: "numeric",
  hour: "numeric",
};

export default function LocalDateAndTime({ timezone }) {
  // Live local date and time
  const [localDate, setLocalDate] = useState(null);
  setInterval(() => {
    const localDate = new Date();
    const UTCTime =
      localDate.getTime() +
      localDate.getTimezoneOffset() * 60000 +
      timezone * 1000;
    const UTCDate = new Date(UTCTime).toLocaleTimeString("en", DateFormat);
    setLocalDate(UTCDate);
  }, 1000);

  return <p className="localDate">{localDate}</p>;
}
