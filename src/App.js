import React, { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import MainContainer from "./components/MainContainer";

import "./App.css";

function App() {
  const users = ["Kamel", "Thiago", "Jose", "Ion"];
  const [whichContainer, setwhichContainer] = useState(0);
  const [whichUser, setwhichUser] = useState(null);
  const [whichPassword, setwhichPassword] = useState(null);
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
  };

  const wrongPassword = () => {
    alert("wrong password");
    setwhichUser(null);
    setwhichPassword(null);
    setlogIn(0);
  };
  const goodPassword = () => {
    users.includes(whichUser) && logIn === 2 ? setlogIn(1) : setlogIn(0);
    logIn === 1 && setwhichContainer(0);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    whichUser !== whichPassword ? wrongPassword() : goodPassword();
  };
  return (
    <div className="all">
      {logIn === 2 && (
        <div className="outPopUp">
          {" "}
          <form className="form-container" onSubmit={handleSubmit}>
            <label>
              Username:
              <input
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
                onChange={(e) => setwhichPassword(e.target.value)}
                required
              />
            </label>
            <input type="submit" value="Submit" className="btn" />
            <button type="button" className="btn cancel" onClick={logIn2}>
              Close
            </button>
          </form>
        </div>
      )}
      <Header
        onHeaderClick={logInCheck}
        logIn={logIn}
        whichUserHeader={whichUser}
      />
      <Tabs onTabsClick={setWindow} logIn={logIn} index={whichContainer} />
      <MainContainer index={whichContainer} />
    </div>
  );
}

export default App;
