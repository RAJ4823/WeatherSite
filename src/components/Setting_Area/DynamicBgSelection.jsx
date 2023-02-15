import React, { useState } from "react";

export default function DynamicBgSelection({ onChange }) {
  const [status, setStatus] = useState(
    localStorage.getItem("dynamicBg") || "ON"
  );
  function handleChange(event) {
    let val = event.target.checked ? "ON" : "OFF";
    onChange("dynamicBg", val);
    setStatus(val);
    localStorage.setItem("dynamicBg", val);
  }

  return (
    <div className="option">
      <div className="label">Dynamic Weather Backgrounds</div>
      <label className="switch">
        <input
          id="dynamic-weather-bg"
          type="checkbox"
          onChange={handleChange}
          checked={status === "ON"}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
