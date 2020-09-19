//////  app.js    ///////
import React, { useState, useRef, useEffect, onClick } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Footer from "./components/Footer";
import MainContainer from "./components/MainContainer";
import "./App.css";

function App1() {
  const [user, setuser] = useState("Ion");
  const [whichClass, setwhichClass] = useState("");
  const [whichUser, setwhichUser] = useState("");
  const [whichUserId, setwhichUserId] = useState("");
  const [whichRole, setwhichRole] = useState("");
  const [logIn, setlogIn] = useState(0);
  const [whichContainer, setwhichContainer] = useState(0);
  const [whichPassword, setwhichPassword] = useState("");
  const [passwordUserWrong, setpasswordUserWrong] = useState(0);

  useEffect(() => {
    getuser();
  }, [logIn, whichClass]);
  function getuser() {
    fetch("http://localhost:3001")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setuser(data);
      });
  }

  function getClass() {
    fetch("http://localhost:3001")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setwhichClass(
          data[data.findIndex((element) => element.name === whichUser)].class_id
        );
        setwhichRole(
          data[data.findIndex((element) => element.name === whichUser)]
            .user_role
        );
        setwhichUserId(
          data[data.findIndex((element) => element.name === whichUser)].id
        );
      });
  }

  ///////////////////////////////////////////////////////////////

  const setWindow = (indexContainer) => {
    setwhichContainer(indexContainer);
  };
  const logInCheck = () => {
    logIn === 0 ? setlogIn(2) : setlogIn(0);
    logIn === 1 && setwhichContainer(0);
    logIn === 1 && window.location.reload();
  };
  const logIn2 = () => {
    logIn === 0 ? setlogIn(2) : setlogIn(0);
    logIn === 2 && setwhichContainer(0);
    setpasswordUserWrong(0);
  };

  const wrongPassword = () => {
    setwhichUser("");
    setwhichPassword("");
    setpasswordUserWrong(1);
    setlogIn(2);
  };
  const goodPassword = () => {
    user.includes(whichUser) && logIn === 2 ? setlogIn(1) : noUser();
    logIn === 1 && setwhichContainer(0);
  };
  const noUser = () => {
    setwhichUser("");
    setwhichPassword("");
    setlogIn(2);
    setpasswordUserWrong(2);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    whichUser !== whichPassword ? wrongPassword() : goodPassword();
    getClass();
  };
  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };
    return [htmlElRef, setFocus];
  };
  const [inputRef, setInputFocus] = useFocus();
  //console.log("role" + whichRole);

  const findUser = (e) => {
    setwhichPassword(e);
  };
  /////////////  CHANGING THE CLASS IF INSTRUCTOR CHANGES   /////////
  function newClass(classIdNew) {
    setwhichClass(classIdNew);
  }

  return (
    <>
      {logIn === 2 && (
        <div className="outPopUp">
          {" "}
          <form className="form-container" onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                autoFocus
                ref={inputRef}
                type="text"
                autoComplete="on"
                placeholder="Enter username"
                value={whichUser}
                onChange={(e) => setwhichUser(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                placeholder="Enter Password"
                autoComplete="on"
                value={whichPassword}
                onChange={(e) => findUser(e.target.value)}
                required
              />
            </label>
            <input
              type="submit"
              value="Submit"
              className="btn"
              onClick={setInputFocus}
            />
            <div className="cancelAndForgot">
              <input
                type="button"
                value="Close"
                className=" cancel"
                onClick={logIn2}
              />
              <input
                type="button"
                style={{ color: "red" }}
                value={
                  passwordUserWrong === 0
                    ? ""
                    : passwordUserWrong === 1
                    ? "Forgot password?"
                    : "No username matched"
                }
                className="cancel"
                onClick={logIn2}
              />
            </div>
          </form>
        </div>
      )}
      <div className={logIn === 2 ? "allblur" : "all"}>
        <Header
          onHeaderClick={logInCheck}
          logIn={logIn}
          whichUserHeader={whichUser}
          whichRole={whichRole}
          whichUserId={whichUserId}
          whichClass={whichClass}
          onClick={newClass}
        />
        <Tabs onTabsClick={setWindow} logIn={logIn} index={whichContainer} />
        <MainContainer
          logIn={logIn}
          index={whichContainer}
          userName={whichUser}
          whichClass={whichClass}
          whichRole={whichRole}
          whichUserId={whichUserId}
        />
        <Footer />
      </div>
    </>
  );
}

export default App1;

//////////////////////////
//////////////////////////
//////////////////////////

import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Footer from "./components/Footer";
import MainContainer from "./components/MainContainer";
import "./App.css";

function App() {
  const [whichClass, setwhichClass] = useState("");
  const [whichUser, setwhichUser] = useState("");
  const [whichUserId, setwhichUserId] = useState("");
  const [whichRole, setwhichRole] = useState("");
  const [logIn, setlogIn] = useState(0);
  const [whichContainer, setwhichContainer] = useState(0);
  const [userdb, setuserdb] = useState("Ion");
  const [whichPassword, setwhichPassword] = useState("");
  const [passwordUserWrong, setpasswordUserWrong] = useState(0);

  useEffect(() => {}, [logIn, whichClass]);

  ////////////////////////////////////////////////////////////////
  const logInCheck = () => {
    logIn === 0 ? setlogIn(2) : setlogIn(0);
    logIn === 1 && setwhichContainer(0);
    logIn === 1 && window.location.reload();
  };
  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };
    return [htmlElRef, setFocus];
  };
  const [inputRef, setInputFocus] = useFocus();

  const logIn2 = () => {
    console.log("trigger");
    logIn === 0 ? setlogIn(2) : setlogIn(0);
    setpasswordUserWrong(0);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("trigger");
    getuser();
    whichUser !== whichPassword ? wrongPassword() : goodPassword(); //here set query to db for real data for password
  };

  const getuser = () => {
    console.log("trigger");
    fetch("http://localhost:3001")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setuserdb(data);
      });
  };
  const wrongPassword = () => {
    console.log("trigger");
    setwhichUser("");
    setwhichPassword("");
    setpasswordUserWrong(1);
    setlogIn(2);
  };
  const goodPassword = () => {
    console.log("trigger");
    userdb.includes(whichUser) && logIn === 2 ? setlogIn(1) : noUser();
    userdb.includes(whichUser) && getClass();
  };
  const noUser = () => {
    console.log("trigger");
    setwhichPassword("");
    setwhichUser("");
    setlogIn(2);
    setpasswordUserWrong(2);
  };
  function getClass() {
    console.log("trigger");
    logIn === 1 &&
      fetch("http://localhost:3001")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setwhichClass(
            data[data.findIndex((element) => element.name === whichUser)]
              .class_id
          );
          setwhichRole(
            data[data.findIndex((element) => element.name === whichUser)]
              .user_role
          );
          setwhichUserId(
            data[data.findIndex((element) => element.name === whichUser)].id
          );
        });
    console.log("triggerwichtig");
  }

  console.log(
    "usernameapp" + whichUser,
    "logIn" + logIn,
    "pwd" + whichPassword,
    "username" + whichUser,
    "class" + whichClass,
    "role" + whichRole,
    "uId" + whichUserId
  );
  ///////////////////////////////////////////////////////////////

  const setWindow = (indexContainer) => {
    setwhichContainer(indexContainer);
  };

  /////////////  CHANGING THE CLASS IF INSTRUCTOR CHANGES   /////////
  function newClass(classIdNew) {
    console.log("trigger");
    setwhichClass(classIdNew);
    console.log("OK");
  }

  console.log(logIn, whichUser, whichClass, whichUserId, whichRole);
  return (
    <>
      {logIn === 2 && (
        <div className="outPopUp">
          {" "}
          <form className="form-container" onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                autoFocus
                ref={inputRef}
                type="text"
                autoComplete="on"
                placeholder="Enter username"
                value={whichUser}
                onChange={(e) => setwhichUser(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                placeholder="Enter Password"
                autoComplete="on"
                value={whichPassword}
                onChange={(e) => setwhichPassword(e.target.value)}
                required
              />
            </label>
            <input
              type="submit"
              value="Submit"
              className="btn"
              onClick={setInputFocus}
            />
            <div className="cancelAndForgot">
              <input
                type="button"
                value="Close"
                className=" cancel"
                onClick={
                  (() => setwhichUser(""),
                  setwhichClass(""),
                  setwhichPassword(""),
                  setwhichRole(""),
                  setwhichUserId(""),
                  setlogIn(0))
                }
              />
              <input
                type="button"
                style={{ color: "red" }}
                value={
                  passwordUserWrong === 0
                    ? ""
                    : passwordUserWrong === 1
                    ? "Forgot password?"
                    : "No username matched"
                }
                className="cancel"
                onClick={logIn2}
              />
            </div>
          </form>
        </div>
      )}
      );
      <div className={logIn === 2 ? "allblur" : "all"}>
        <Header
          onHeaderClick={logInCheck}
          logIn={logIn}
          whichUserHeader={whichUser}
          whichRole={whichRole}
          whichUserId={whichUserId}
          whichClass={whichClass}
          onClick={newClass}
        />
        <Tabs onTabsClick={setWindow} logIn={logIn} index={whichContainer} />
        <MainContainer
          logIn={logIn}
          index={whichContainer}
          userName={whichUser}
          whichClass={whichClass}
          whichRole={whichRole}
          whichUserId={whichUserId}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
