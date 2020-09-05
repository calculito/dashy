import React, { useState, useEffect } from "react";
import logo from "../images/migracode-logo.png";
import login from "../images/login.png";

function Header({ onHeaderClick, logIn, whichUserHeader }) {
  const [userRole, setuserRole] = useState(false);

  let username = { whichUserHeader }.whichUserHeader;
  username === ""
    ? (username = "Ion")
    : (username = { whichUserHeader }.whichUserHeader);

  useEffect(() => {
    getuserRoleFromDB(username);
    console.log("first username" + username);
    var timerID = setInterval(() => tick(), 10000);
    console.log(username);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [logIn]);

  function getuserRoleFromDB(username) {
    console.log("1" + whichUserHeader);
    fetch("http://localhost:3001/userrole")
      .then((response) => response.json())
      .then((data) => {
        setuserRole(
          data[data.findIndex((element) => element.name === username)].user_role
        );
      });
  }

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
          Hello {username}, the time is {time}, you are {userRole}
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
