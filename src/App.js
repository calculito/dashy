import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import MainContainer from "./components/MainContainer";
import "./App.css";
import { getDayClassNames } from "@fullcalendar/react";

function App() {
  const [user, setuser] = useState("Ion");
  const [whichRole, setwhichRole] = useState("");
  const [whichClass, setwhichClass] = useState("");
  const [whichContainer, setwhichContainer] = useState(0);
  const [passwordUserWrong, setpasswordUserWrong] = useState(0);
  const [whichUser, setwhichUser] = useState("");
  const [whichUserId, setwhichUserId] = useState("");
  const [whichPassword, setwhichPassword] = useState("");
  const [logIn, setlogIn] = useState(0);
  useEffect(() => {
    getuser();
  }, [logIn]);
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
  function createuser() {
    let name = prompt("Enter user1 name");
    let email = prompt("Enter user1 email");
    fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        getuser();
      });
  }

  function deleteuser() {
    let id = prompt("Enter user1 id");
    fetch(`http://localhost:3001/user/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getuser();
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
        />
        <Tabs onTabsClick={setWindow} logIn={logIn} index={whichContainer} />
        <MainContainer
          logIn={logIn}
          index={whichContainer}
          userName={whichUser}
          whichClass={whichClass}
          whichRole={whichRole}
          whichClass={whichClass}
          whichUserId={whichUserId}
        />
        <div className="iconsRefferer">
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/smashicons"
            title="Smashicons"
          >
            Smashicons
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            {" "}
            www.flaticon.com
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
