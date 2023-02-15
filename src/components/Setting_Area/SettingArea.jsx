import React from "react";
import "./setting-area.css";
import useOutsideClick from "../useOutsideClick";
import TempUnitsSelection from "./TempUnitsSelection";
import DynamicBgSelection from "./DynamicBgSelection";
import DefaultBgSelection from "./DefaultBgSelection";
import CloseIcon from "@mui/icons-material/Close";

export default function settingArea({ onClose, onChange }) {
  const ref = useOutsideClick(onClose);

  return (
    <div ref={ref} className="popup-area setting-area">
      <p className="title">Settings</p>
      <span className="icon" onClick={onClose}>
        <CloseIcon />
      </span>

      <div className="options">
        <TempUnitsSelection onChange={(key, val) => onChange(key, val)} />
        <DynamicBgSelection onChange={(key, val) => onChange(key, val)} />
        <DefaultBgSelection onChange={(key, val) => onChange(key, val)} />
      </div>
    </div>
  );
}
