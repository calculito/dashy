import React, { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import MainContainer from "./components/MainContainer";

import "./App.css";

function App() {
  const mentors = ["Ali", "Sub", "Loic", "Anthony", "Lucy", "Mozart"];
  const [whichContainer, setwhichContainer] = useState(0);
  const [logIn, setlogIn] = useState(0);
  const setWindow = (indexContainer) => {
    setwhichContainer(indexContainer);
  };
  const logInCheck = () => {
    logIn === 0 ? setlogIn(1) : setlogIn(0);
  };
  return (
    <div className="all">
      <Header onHeaderClick={logInCheck} />
      <Tabs onTabsClick={setWindow} logIn={logIn} index={whichContainer} />
      <MainContainer index={whichContainer} />
    </div>
  );
}

export default App;
