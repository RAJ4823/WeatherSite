import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./search-area.css";
import { Hidden } from "@mui/material";

export default function SearchArea({ onSearch, isLoading }) {
  const [cityName, setCityName] = useState("");
  const [message, setMessage] = useState(null);

  function showError(msg) {
    setMessage(msg);
    document.documentElement.style.setProperty("--color", `RED`);
  }

  function removeError() {
    setMessage("");
    document.documentElement.style.setProperty("--color", `var(--accent)`);
  }

  function handleChange(event) {
    setCityName(event.target.value);
    removeError();
  }

  function searchCity() {
    if (cityName.trim() === "") {
      showError("Enter valid city name!");
      return;
    }
    removeError();
    onSearch(cityName.trim());
  }

  function searchLocation() {
    removeError();
    onSearch(null);
  }

  return (
    <div className="search-area">
      <p className="text">Enter name of the city with country code</p>

      <div className="input-container">
        <input
          type="text"
          name="cityName"
          value={cityName}
          placeholder="Ex: Ahmedabad, In"
          onChange={handleChange}
        />
        <LocationOnIcon
          id="location-icon"
          titleAccess="Current Location"
          className="icon"
          onClick={searchLocation}
        />
      </div>

      <p className="message-text">{message}</p>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <button type="button" onClick={searchCity}>
          Search
        </button>
      )}

      <div className="about-area">
        <p className="about-text">
          Get <span>Accurate</span> and <span>Up-to-Date</span> weather
          information with a <span>Beautiful Interface</span> and{" "}
          <span>Dynamic Backgrounds</span>
        </p>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}
