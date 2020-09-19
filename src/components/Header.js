import React, { useState, useEffect } from "react";
import logo from "../images/migracode-logo.png";
import login from "../images/login.png";
import { useSpeechSynthesis } from "react-speech-kit";

function Header({
  onHeaderClick,
  logIn,
  whichUserHeader,
  whichRole,
  whichUserId,
  whichClass,
  onClick,
}) {
  let [userRole, setuserRole] = useState(false);
  const [userClass, setuserClass] = useState(false);
  let [allClass, setallClass] = useState([{ id: 3, class_name: "mar-2020-1" }]);
  let [allClassId, setallClassId] = useState([{ id: 3 }]);
  const [openInputWindow, setopenInputWindow] = useState(false);
  const ref = React.useRef();
  let username = "Ion";
  whichUserHeader && (username = whichUserHeader);
  userRole = "Student";
  whichRole && (userRole = whichRole);
  /////////////////   USEEFFECTS   ///////////////
  useEffect(() => {
    getuserRoleFromDB(username);
    getInfoTochangeCLass();
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [logIn, whichClass]);

  /////////////////   GET USER CLASS NAME   ///////////////
  function getuserRoleFromDB(username) {
    fetch("http://localhost:3001/userrole")
      .then((response) => response.json())
      .then((data) => {
        setuserClass(
          data[data.findIndex((element) => element.name === username)]
            .class_name
        );
      });
  }
  //////////////////  GET THE TIME  ///////////////////
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
  //////////////////  GET ALL CLASS  ///////////////////
  function getInfoTochangeCLass() {
    let endpoint = "http://localhost:3001/class/";
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const arrToClass = data.map(function (daten) {
          return daten.class_name;
        });
        setallClass(arrToClass);
        const arrToClassId = data.map(function (daten) {
          return daten.id;
        });
        setallClassId(arrToClassId);
      });
  }

  //////////////////  CHANGE CLASS ///////////////////
  function changeClass(i) {
    whichClass = allClassId[i];
    let data = { classId: allClassId[i] };
    fetch("http://localhost:3001/switchclass/".concat(whichUserId), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setopenInputWindow(false);
  }

  return (
    <div className="header" key={whichUserHeader}>
      {logIn === 1 ? (
        <div className="greeting">
          <button className="buttonHW" key="1">
            {time}
          </button>
          <button className="buttonHW" key="2">
            {username}
          </button>
          <button className="buttonHW" key="3">
            {userRole}
          </button>
          {whichRole === "Instructor" ? (
            <button
              className="buttonHW"
              key="4"
              onClick={(e) => setopenInputWindow("1")}
            >
              {userClass}
              <span className="tooltiptext">Change your class</span>
            </button>
          ) : (
            <button className="buttonHW" key="4">
              {userClass}
            </button>
          )}
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
      {openInputWindow !== false && (
        <div className="outPopUpVariabel">
          <form className="form-container">
            <div className="linksContainer">
              {allClass.map((data, i) => (
                <div
                  className="rowHW"
                  key={"divRHW" + i}
                  onClick={() => onClick((whichClass = allClassId[i]))}
                >
                  <div
                    className="recordings"
                    key={"d" + i}
                    onClick={(e) => changeClass(i)}
                  >
                    <a className="recordinglinks" key={i}>
                      {data}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default Header;
