import React, { useState, useRef } from "react";
import { useQuery } from "react-query";
import {
  Header,
  Tools,
  Tabs,
  Footer,
  MainContainer,
  API,
  CSS,
  Graffiti,
} from "./components/Impex.js";

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
  const [whichPasswordDB, setwhichPasswordDB] = useState("");
  const [passwordUserWrong, setpasswordUserWrong] = useState(0);

  /////////////////////  NO USEEFFECT ANYMORE NEEDED //////////////////////
  const logInCheck = () => {
    logIn === 0 ? setlogIn(2) : setlogIn(0);
    logIn === 1 && setwhichContainer(0);
    logIn === 1 && window.location.reload();
    getuser();
  };
  ////////////////  CANCEL BUTTON IN FORM ///////////////
  const cancel = () => {
    setlogIn(0);
    setwhichUser("");
    setwhichContainer(0);
    setpasswordUserWrong(0);
    setblur(0);
    setwhichClass("");
    setwhichRole("");
    setwhichPassword("");
    setwhichUserId("");
  };
  console.log(logIn, blur);
  ////////////////  INIT BY FORM ///////////////
  const checkUser = (evt) => {
    evt.preventDefault();
    user.includes(whichUser) && logIn === 2 ? setlogIn(3) : noUser();
    user.includes(whichUser) && getAllData();
  };
  ////////////////  NO USER FOUND IN DB  ///////////////
  const noUser = () => {
    setwhichUser("");
    setlogIn(2);
    setpasswordUserWrong(2);
  };

  const checkPassword = (evt) => {
    evt.preventDefault();

    whichPassword !== whichPasswordDB ? wrongPassword() : goodPassword();
  };
  //////////////  GET USER TO CHECK IF IN DB AXIOS /////////////
  const { isLoading, data } = useQuery("fetchData", () => API.get());

  const getuser = () => {
    !isLoading && setuser(JSON.stringify({ data }));
  };
  ///////////////    GET PASSWORD< CLASS< ROLE< ID<     /////////////
  async function getAllData() {
    let endpoint = "https://dashybackend.herokuapp.com/alld/";
    await fetch(endpoint)
      .then((response) => response.json())
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
        setwhichPasswordDB(
          data[data.findIndex((element) => element.name === whichUser)]
            .user_password
        );
      });
  }
  //////////////// WRONG PASSWORD HANDLE ///////////////
  const wrongPassword = () => {
    setwhichPassword("");
    setpasswordUserWrong(1);
    setlogIn(3);
  };
  ////////////////  GOOD PASSWORD ///////////////
  const goodPassword = () => {
    setlogIn(1);
  };

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

  console.log(
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
    <>
      {logIn === 2 && (
        <div className="outPopUp">
          {" "}
          <form className="form-container" onSubmit={checkUser}>
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
            <input
              type="submit"
              value="Submit"
              className="btn"
              onClick={setInputFocus}
            />
            <div className="cancelAndForgotLogIn">
              <input
                type="button"
                value="Close"
                className=" cancel"
                onClick={(e) => cancel()}
              />
              <input
                type="button"
                style={{ color: "red" }}
                value={passwordUserWrong === 2 ? "Forgot username?" : undefined}
                className="cancel"
                onClick={(e) =>
                  window.open(
                    "mailto:admin@migracode.barcelona?subject=I forgot my username"
                  )
                }
              />
            </div>
          </form>
        </div>
      )}{" "}
      {logIn === 3 && (
        <div className="outPopUp">
          {" "}
          <form className="form-container" onSubmit={checkPassword}>
            <label>
              Password:
              <input
                autoFocus
                ref={inputRef}
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
            <div className="cancelAndForgotLogIn">
              <input
                type="button"
                value="Close"
                className=" cancel"
                onClick={(e) => cancel()}
              />
              <input
                type="button"
                style={{ color: "red" }}
                value={passwordUserWrong === 1 ? "Forgot password?" : undefined}
                className="cancel"
                onClick={(e) =>
                  window.open(
                    "mailto:admin@migracode.barcelona?subject=I forgot my password"
                  )
                }
              />
            </div>
          </form>
        </div>
      )}{" "}
      {isLoading ? (
        <div>
          C'mon database, wake up ...{" "}
          <img className="bgimg" src={Graffiti} alt="graffiti" />
        </div>
      ) : (
        <div className={logIn === 3 || logIn === 2 ? "allblur" : "all"}>
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
          />
          <Footer />
        </div>
      )}
    </>
  );
}
