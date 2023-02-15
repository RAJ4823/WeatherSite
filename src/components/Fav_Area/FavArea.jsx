import React from "react";

import useOutsideClick from "../useOutsideClick";
import CloseIcon from "@mui/icons-material/Close";
import "./fav-area.css";

export default function FavArea({ onSearch, onClose }) {
  const ref = useOutsideClick(onClose);
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites.sort();

  function handleClick(event) {
    const cityName = event.target.innerText;
    onSearch(cityName);
    onClose();
  }

  function FavCity({ name }) {
    return (
      <div className="fav-city" onClick={handleClick}>
        {name}
      </div>
    );
  }

  return (
    <div ref={ref} className="fav-area popup-area">
      <p className="title">Favourite Cities</p>
      <span className="icon" onClick={onClose}>
        <CloseIcon />
      </span>

      <div className="fav-cities">
        {favourites.length === 0 && (
          <div className="fav-city">Nothing to show!</div>
        )}
        {favourites.map((cityName) => (
          <FavCity name={cityName} key={cityName} />
        ))}
      </div>

      
    </div>
  );
}
