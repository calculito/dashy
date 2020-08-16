import React, { useState, useEffect } from "react";
import logo from "../images/migracode-logo.png";

function Header({ onHeaderClick }) {
  const username = ["Thiago", "Jose", "Kamel", "Ion"];
  const [date, setDate] = useState(new Date());
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var hours = today.getHours();

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });
  function tick() {
    setDate(new Date());
  }

  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <div className="greeting">
        Hello {hours < 7 ? username[1] : hours > 22 ? username[2] : username[0]}
        , it is {time} and you have no appointments in your calendar today!
      </div>
      <button onClick={onHeaderClick}>Log in</button>
    </div>
  );
}
export default Header;
