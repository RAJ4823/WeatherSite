import React, { useState, useEffect, useRef } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";

const ls = localStorage;
const favs = JSON.parse(ls.getItem("favourites")) || [];

export default function Header({
  title,
  onBack,
  onToggleFav,
  onToggleSetting,
}) {
  const [favourites, setFavourites] = useState(favs);

  function addFav() {
    const newFav = [...favourites, title];
    setFavourites(newFav);
    ls.setItem("favourites", JSON.stringify(newFav));
  }

  function removeFav() {
    const newFav = [...favourites];
    const index = newFav.indexOf(title);
    newFav.splice(index, 1);
    setFavourites(newFav);
    ls.setItem("favourites", JSON.stringify(newFav));
  }

  function LeftIcon() {
    if (title === "Weather Site")
      return (
        <SettingsIcon
          titleAccess="Settings"
          className="left-icon icon"
          onClick={onToggleSetting}
        />
      );

    return (
      <ArrowBackIosNewIcon
        titleAccess="Go Back"
        className="left-icon icon"
        onClick={onBack}
      />
    );
  }

  function RightIcon() {
    if (title === "Weather Site")
      return (
        <FolderSpecialIcon
          titleAccess="Favourite Cities"
          className="right-icon icon"
          onClick={onToggleFav}
        />
      );

    if (favourites.some((name) => name === title))
      return (
        <StarIcon
          titleAccess="Remove from favourite"
          className="right-icon active icon"
          onClick={removeFav}
        />
      );

    return (
      <StarOutlineIcon
        titleAccess="Add to favourite"
        className="right-icon icon"
        onClick={addFav}
      />
    );
  }

  return (
    <div className="header">
      <LeftIcon />
      <p className="header-title">{title}</p>
      <RightIcon />
    </div>
  );
}
