import React from "react";
import logo from "../images/migracode-logo.png";

function Header({ onHeaderClick }) {
  return (
    <div className="header">
      <img src={logo} alt="logo" />

      <button onClick={onHeaderClick}>Log in</button>
    </div>
  );
}
export default Header;
