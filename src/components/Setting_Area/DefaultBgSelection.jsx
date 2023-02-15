import React, { useState } from "react";

export default function DefaultBgSelection({ onChange }) {
  const [bgNum, setBgNum] = useState(localStorage.getItem("defaultBg") || "4");
  const ids = ["0", "1", "2", "3", "4", "5"];

  function handleChange(event) {
    let { value } = event.target;
    localStorage.setItem("defaultBg", value);
    onChange("defaultBg", value);
    setBgNum(value);
  }

  function ThumbnailImage({ num }) {
    const source = `/img/default/thumbnail${num}.jpg`;
    return (
      <div className="thumbnail-container">
        <label htmlFor={`thumbnail${num}`}>
          <img src={source} alt="Thumbnail Image" />
        </label>
        <input
          id={`thumbnail${num}`}
          type="radio"
          name="default-bg"
          value={num}
          onChange={handleChange}
          checked={bgNum === num}
        />
      </div>
    );
  }

  return (
    <div className="option">
      <div className="option-text">
        <div className="label">Default Home Background</div>

        <div className="select-random">
          <label htmlFor="random">Random</label>
          <input
            id="random"
            type="radio"
            name="default-bg"
            value="-1"
            onChange={handleChange}
            checked={bgNum === "-1"}
          />
        </div>
      </div>

      <div className="thumbnail-images">
        {ids.map((number) => (
          <ThumbnailImage num={number} key={number} />
        ))}
      </div>
    </div>
  );
}
