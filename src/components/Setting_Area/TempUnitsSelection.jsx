import React, { useState } from "react";
export default function TempUnitsSelection({ onChange }) {
  const [tempUnit, setTempUnit] = useState(
    localStorage.getItem("temp_unit") || "c"
  );

  function handleChange(event) {
    let { value } = event.target;
    localStorage.setItem("temp_unit", value);
    onChange("temp_unit", value);
    setTempUnit(value);
  }

  return (
    <div className="option">
      <div className="label">Temperature Units</div>
      <div className="unit-selection">
        <label htmlFor="celsius"> &#8451; </label>
        <input
          id="c"
          type="radio"
          name="temp-units"
          value="c"
          onChange={handleChange}
          checked={tempUnit === "c"}
        />

        <label htmlFor="fahrenheit"> &#8457; </label>
        <input
          id="f"
          type="radio"
          name="temp-units"
          value="f"
          onChange={handleChange}
          checked={tempUnit === "f"}
        />
      </div>
    </div>
  );
}
