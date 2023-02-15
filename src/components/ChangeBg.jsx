import React from "react";

function changeDefaultBg() {
  let defaultBg = localStorage.getItem("defaultBg") || "4";
  if (defaultBg == -1) defaultBg = Math.floor(Math.random() * 6);

  let imagePath = `./img/default/img${defaultBg}.jpg`;
  let color = `img${defaultBg}`;

  changeBg(imagePath, color);
}

function changeDynamicBg(data) {
  let imagePath, color;
  let status = localStorage.getItem("dynamicBg") || "ON";
  if (status === "OFF") return;

  let dynamicBg = data.weather[0].main.toLowerCase();
  let day_night = data.weather[0].icon[2];

  if (
    dynamicBg === "clear" ||
    dynamicBg === "clouds" ||
    dynamicBg === "rain" ||
    dynamicBg === "snow"
  ) {
    imagePath = `./img/weather/${day_night}-${dynamicBg}.jpg`;
    color = `${day_night}-${dynamicBg}`;
  } else {
    if (dynamicBg == "sand" || dynamicBg == "ash") dynamicBg = "dust";

    imagePath = `./img/weather/${dynamicBg}.jpg`;
    color = `${dynamicBg}`;
  }

  changeBg(imagePath, color);
}

function changeBg(imagePath, color) {
  document.documentElement.style.setProperty("--accent", `var(--${color})`);
  document.body.style.background = `url(${imagePath}) no-repeat center center`;
  document.body.style.backgroundSize = "cover";
}

export { changeDefaultBg, changeDynamicBg };
