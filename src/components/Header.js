import React, { useState, useEffect } from "react";
import { logo, login, API, Tools } from "./Impex.js";
import axios from "axios";
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
  const [openInputWindow, setopenInputWindow] = useState(false);
  const [appState, setAppState] = useState({
    loading: null,
    genLinks: null,
    classes: null,
  });
  /////////////////   USEEFFECTS   ///////////////
  useEffect(() => {
    logIn === 1 &&
      axios
        .all([API.get(`userclassname/${whichUserId}`), API.get(`class/`)])
        .then((response) => {
          setuserClassName(response[0].data[0].class_name);
          setAppState({
            loading: false,
            classes: response[1].data,
          });
        });
    //logIn === 1 && getclassNameFromDB();
    // var timerID = setInterval(() => tick(), 1000);
    // return function cleanup() {
    //   clearInterval(timerID);
    // };
  }, [logIn, userClassName, whichClass, openInputWindow]);

  //////////////////  CHANGE CLASS ///////////////////
  async function changeClass(i) {
    let data = { classId: appState.classes[i].id };
    await fetch(
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
          <div className="headerNR">
            <span className="buttonHW1" key="2">
              {whichUserHeader}
            </span>
            <span className="circleNonClick" key="3">
              {whichRole.substring(0, 1)}
            </span>
          </div>
          {whichRole !== "Student" ? (
            <button
              className="buttonHW"
              key="4"
              onClick={() => setopenInputWindow("1")}
            >
              {userClassName}
              <span className="tooltiptext">Change your class</span>
            </button>
          ) : (
            <span className="buttonHW1" key="4">
              {userClassName}
            </span>
          )}
        </div>
      ) : (
        <>.</>
      )}
      {logIn === 1 ? <Tools /> : undefined}
      <div className="greeting">
        <img
          className="loginlogo"
          src={logIn === 1 ? logo : login}
          alt="logo"
          onClick={onHeaderClick}
        />
      </div>
      {openInputWindow !== false &&
        (appState.loading !== false ? (
          <div>C'mon database, wake up ...</div>
        ) : (
          <div className="outPopUpVariabel">
            {appState.classes.map((data, i) => (
              <div
                className="recordingslinks"
                key={"divRHW" + i}
                onClick={() => onClick((whichClass = appState.classes[i].id))}
              >
                <div key={"d" + i} onClick={(e) => changeClass(i)}>
                  <button className="recordinglinks" key={i}>
                    {data.class_name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
export default React.memo(Header);
