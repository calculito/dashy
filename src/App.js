import React, { useState, useRef, Suspense, Fragment } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Footer from "./components/Footer";
import MainContainer from "./components/MainContainer";
import "./App.css";

export default function App() {
  const [logIn, setlogIn] = useState(0);
  const [user, setuser] = useState("");
  const [blur, setblur] = useState(0);
  const [whichClass, setwhichClass] = useState("");
  const [whichUser, setwhichUser] = useState("");
  const [whichUserId, setwhichUserId] = useState("");
  const [whichRole, setwhichRole] = useState("");
  const [whichContainer, setwhichContainer] = useState(0);
  const [whichPassword, setwhichPassword] = useState("");
  const [passwordUserWrong, setpasswordUserWrong] = useState(0);

  /////////////////////  NO USEEFFECT ANYMORE NEEDED //////////////////////
  const logInCheck = () => {
    logIn === 0 ? setlogIn(2) : setlogIn(0);
    logIn === 2 && getuser();
    logIn === 2 ? setblur(1) : setblur(0);
    logIn === 1 && setwhichContainer(0);
    logIn === 1 && window.location.reload();
    getuser();
  };
  ////////////////  CANCEL BUTTON IN FORM ///////////////
  const logIn2 = () => {
    logIn === 0 ? setlogIn(2) : setlogIn(0);
    logIn === 2 && setwhichContainer(0);
    setpasswordUserWrong(0);
  };
  ////////////////  INIT BY FORM ///////////////
  const handleSubmit = (evt) => {
    evt.preventDefault();
    whichUser !== whichPassword ? wrongPassword() : goodPassword();
  };
  /////////////////// GET USER TO CHECK IF IN DB ////////////////////
  async function getuser() {
    await fetch("https://dashybackend.herokuapp.com/")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setuser(data);
      });
  }
  //////////////// WRONG PASSWORD HANDLE ///////////////
  const wrongPassword = () => {
    setwhichUser("");
    setwhichPassword("");
    setpasswordUserWrong(1);
    setlogIn(2);
    setblur(1);
  };
  ////////////////  GOOD PASSWORD ///////////////
  const goodPassword = () => {
    user.includes(whichUser) && logIn === 2 ? setlogIn(1) : noUser();
    user.includes(whichUser) && logIn === 1 && setwhichContainer(0);
    user.includes(whichUser) && getClass();
  };
  ////////////////  NO USER FOUND IN DB  ///////////////
  const noUser = () => {
    setwhichUser("");
    setwhichPassword("");
    setlogIn(2);
    setpasswordUserWrong(2);
    setblur(1);
  };
  /////////////////// GET DATA FROM DB WHERE USER ////////////////////
  async function getClass() {
    await fetch("https://dashybackend.herokuapp.com/alld")
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

  ////////////// SET FOCUS ON FORM /////////////
  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };
    return [htmlElRef, setFocus];
  };
  const [inputRef, setInputFocus] = useFocus();

  /////////////  CHANGING THE CLASS IF INSTRUCTOR CHANGES   /////////
  function newClass(classIdNew) {
    setwhichClass(classIdNew);
  }
  //////////// SET WINDOW /////////////
  const setWindow = (indexContainer) => {
    setwhichContainer(indexContainer);
  };
  //////////// CHECK BLUR /////////////
  const checkBlur = () => {
    blur === 0 ? setblur(1) : setblur(0);
  };
  console.log(
    blur +
      ".." +
      logIn +
      ".." +
      whichUser +
      ".." +
      whichClass +
      ".." +
      whichUserId +
      ".." +
      whichRole
  );

  return (
    <Fragment>
      <Suspense fallback={<div>Loading...</div>}>
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
          <div className={blur === 1 || logIn === 2 ? "allblur" : "all"}>
            <Header
              onHeaderClick={logInCheck}
              logIn={logIn}
              whichUserHeader={whichUser}
              whichRole={whichRole}
              whichUserId={whichUserId}
              whichClass={whichClass}
              onClick={newClass}
            />
            <Tabs
              onTabsClick={setWindow}
              logIn={logIn}
              index={whichContainer}
              whichRole={whichRole}
            />
            <MainContainer
              logIn={logIn}
              index={whichContainer}
              userName={whichUser}
              whichClass={whichClass}
              whichRole={whichRole}
              whichUserId={whichUserId}
              blur={checkBlur}
            />
            <Footer />
          </div>
        </>
      </Suspense>
    </Fragment>
  );
}
