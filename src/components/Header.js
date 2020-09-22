import React, { useState, useEffect } from "react";
import logo from "../images/migracode-logo.png";
import login from "../images/login.png";
function Header({
  onHeaderClick,
  logIn,
  whichUserHeader,
  whichRole,
  whichUserId,
  whichClass,
  onClick,
}) {
  const [userClassName, setuserClassName] = useState(false);
  let [allClass, setallClass] = useState([{ id: 3, class_name: "mar-2020-1" }]);
  let [allClassId, setallClassId] = useState([{ id: 3 }]);
  const [openInputWindow, setopenInputWindow] = useState(false);
  const ref = React.useRef();
  /////////////////   USEEFFECTS   ///////////////
  useEffect(() => {
    logIn === 1 && getInfoTochangeCLass();
    logIn === 1 && getclassNameFromDB();
    console.log("trigger");
    console.log(whichClass, userClassName);
    //var timerID = setInterval(() => tick(), 1000);
    //return function cleanup() {
    //   clearInterval(timerID);
    //  };
  }, [logIn, userClassName, openInputWindow]);

  useEffect(() => {
    logIn === 1 && getclassNameFromDB();
    console.log("trigger2");
    console.log(whichClass, userClassName);
    //var timerID = setInterval(() => tick(), 1000);
    //return function cleanup() {
    //   clearInterval(timerID);
    //  };
  }, [allClassId]);
  /////////////////   GET USER CLASS NAME   ///////////////

  async function getclassNameFromDB() {
    await fetch("https://dashybackend.herokuapp.com/userclassname")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setuserClassName(
          data[data.findIndex((element) => element.name === whichUserHeader)]
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

  //function tick() {
  //   setDate(new Date());
  // }
  //////////////////  GET ALL CLASS  ///////////////////
  async function getInfoTochangeCLass() {
    let endpoint = "https://dashybackend.herokuapp.com/class/";
    await fetch(endpoint)
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
    //whichClass = allClassId[i];
    let data = { classId: allClassId[i] };
    fetch(
      "https://dashybackend.herokuapp.com/switchclass/".concat(whichUserId),
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    setopenInputWindow(false);
  }

  return (
    <div className="header" key={whichUserHeader}>
      {logIn === 1 ? (
        <div className="greeting">
          <button className="buttonHW" key="2">
            {whichUserHeader}
          </button>
          <button className="buttonHW" key="3">
            {whichRole}
          </button>
          {whichRole === "Instructor" ? (
            <button
              className="buttonHW"
              key="4"
              onClick={() => setopenInputWindow("1")}
            >
              {userClassName}
              <span className="tooltiptext">Change your class</span>
            </button>
          ) : (
            <button className="buttonHW" key="4">
              {userClassName}
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
          {allClass.map((data, i) => (
            <div
              className="buttonHW"
              key={"divRHW" + i}
              onClick={() => onClick((whichClass = allClassId[i]))}
            >
              <div
                style={{ marginTop: "3px" }}
                className="buttonHW"
                key={"d" + i}
                onClick={(e) => changeClass(i)}
              >
                <button className="recordinglinks" key={i}>
                  {data}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Header;
