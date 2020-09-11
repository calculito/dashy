import React, { useState, useEffect } from "react";
import logo from "../images/migracode-logo.png";
import login from "../images/login.png";

function Header({ onHeaderClick, logIn, whichUserHeader }) {
  const [userRole, setuserRole] = useState(false);
  const [userClass, setuserClass] = useState(false);
  let username;
  whichUserHeader === "" ? (username = "Ion") : (username = whichUserHeader);

  function getuserRoleFromDB(username) {
    fetch("http://localhost:3001/userrole")
      .then((response) => response.json())
      .then((data) => {
        setuserRole(
          data[data.findIndex((element) => element.name === username)].user_role
        );
        setuserClass(
          data[data.findIndex((element) => element.name === username)]
            .class_name
        );
      });
  }
  useEffect(() => {
    getuserRoleFromDB(username);
    var timerID = setInterval(() => tick(), 10000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [logIn]);
  function zweistellig(s) {
    while (s.toString().length < 2) {
      s = "0" + s;
    }
    return s;
  }
  const [date, setDate] = useState(new Date());
  var time =
    zweistellig(date.getHours()) +
    ":" +
    zweistellig(date.getMinutes()) +
    ":" +
    zweistellig(date.getSeconds());

  function tick() {
    setDate(new Date());
  }

  return (
    <div className="header" key={whichUserHeader}>
      {logIn === 1 ? (
        <div className="greeting">
          Hello {username}, the time is {time}, you are {userRole} in the class{" "}
          {userClass}
        </div>
      ) : (
        <>.</>
      )}

      <img
        className="greeting"
        src={logIn === 1 ? logo : login}
        alt="logo"
        onClick={onHeaderClick}
      />
    </div>
  );
}
export default Header;
