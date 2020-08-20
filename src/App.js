import React, { useState, useRef } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import MainContainer from "./components/MainContainer";

import "./App.css";

function App() {
  const users = ["Kamel", "Thiago", "Jose", "Ion"];
  const [whichContainer, setwhichContainer] = useState(0);
  const [passwordUserWrong, setpasswordUserWrong] = useState(0);
  const [whichUser, setwhichUser] = useState("");
  const [whichPassword, setwhichPassword] = useState("");
  const [logIn, setlogIn] = useState(0);

  const setWindow = (indexContainer) => {
    setwhichContainer(indexContainer);
  };
  const logInCheck = () => {
    logIn === 0 ? setlogIn(2) : setlogIn(0);
    logIn === 1 && setwhichContainer(0);
  };
  const logIn2 = () => {
    logIn === 0 ? setlogIn(2) : setlogIn(0);
    logIn === 2 && setwhichContainer(0);
    setpasswordUserWrong(0);
  };

  const wrongPassword = () => {
    //alert("Forgot password?");
    setwhichUser("");
    setwhichPassword("");
    setpasswordUserWrong(1);
    setlogIn(2);
  };
  const goodPassword = () => {
    users.includes(whichUser) && logIn === 2 ? setlogIn(1) : noUser();
    logIn === 1 && setwhichContainer(0);
  };
  const noUser = () => {
    //alert("No user with this name");
    setwhichUser("");
    setwhichPassword("");
    setlogIn(2);
    setpasswordUserWrong(2);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    whichUser !== whichPassword ? wrongPassword() : goodPassword();
  };
  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };
    return [htmlElRef, setFocus];
  };
  const [inputRef, setInputFocus] = useFocus();
  console.log(passwordUserWrong + " " + whichUser);

  const findUser = (e) => {
    setwhichPassword(e);
  };
  ///////////////////////////
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
                className=" cancel"
                onClick={logIn2}
              />
            </div>
          </form>
        </div>
      )}
      <div className={logIn === 0 ? "all" : "allblur"}>
        <Header
          onHeaderClick={logInCheck}
          logIn={logIn}
          whichUserHeader={whichUser}
        />
        <Tabs onTabsClick={setWindow} logIn={logIn} index={whichContainer} />
        <MainContainer index={whichContainer} userName={whichUser} />
      </div>
    </>
  );
}

export default App;
