import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <p className="footer-title">
        <span>© Superverse {" "}</span>
        <span>{currentYear}</span>
        <span> | </span>
        <a className="accent-text" href="https://raj4823.github.io/MySite" target="_blank">Raj Patel</a>
      </p>
    </div>
  );
}
