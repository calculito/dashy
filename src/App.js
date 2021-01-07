import React, { useState, useRef, lazy, Suspense } from "react";
import { useQuery } from "react-query";
import { Header, Tabs, Footer, API } from "./components/Impex.js";
import Swal from "sweetalert2";

function App() {
  const [logIn, setlogIn] = useState(0);
  const [user, setuser] = useState("");
  const [whichClass, setwhichClass] = useState("");
  const [whichUser, setwhichUser] = useState("");
  const [whichUserId, setwhichUserId] = useState("");
  const [whichRole, setwhichRole] = useState("");
  const [whichContainer, setwhichContainer] = useState(0);
  const [whichPassword, setwhichPassword] = useState("");
  const [whichPasswordDB, setwhichPasswordDB] = useState("");
  const [passwordUserWrong, setpasswordUserWrong] = useState(0);
  const MainContainer = lazy(() => import("./components/MainContainer")); //The React.lazy method makes it easy to code-split a React application on a component level using dynamic imports. Don't forget to import it from react too :)
  //console.log(logIn + ".." + whichUser + ".." + whichClass + ".." + whichUserId + ".." + whichRole + ".." + user + ".." + whichContainer + ".." + whichPassword + ".." + whichPasswordDB + ".." + passwordUserWrong);

  //////////////  GET USER TO CHECK IF IN DB AXIOS /////////////
  //login status 0 means not logged in, window to log in not active
  //login status 1 means logged in, window to log in not active
  //login status 2 means log in pending, window to log in active
  const { isLoading, data } = useQuery("fetchData", () => API.get());
  const logInCheck = () => {
    console.log("render...");
    logIn === 0 ? setlogIn(2) : setlogIn(0);
    logIn === 1 && setwhichContainer(0);
    logIn === 1 && window.location.reload();
    Getuser();
  };
  const Getuser = () => {
    console.log("render...");
    !isLoading && setuser(JSON.stringify({ data }));
  };
  ////////////////  CANCEL BUTTON IN FORM ///////////////
  const cancel = () => {
    console.log("render...");
    setlogIn(0);
    setwhichUser("");
    setwhichContainer(0);
    setpasswordUserWrong(0);
    setwhichClass("");
    setwhichRole("");
    setwhichPassword("");
    setwhichUserId("");
  };

  ////////////////  INIT BY FORM ///////////////
  const checkUser = (evt) => {
    console.log("render...");
    evt.preventDefault();
    user.includes(whichUser) && logIn === 2 ? setlogIn(3) : noUser();
    user.includes(whichUser) && getAllData();
  };

  ////////////////  NO USER FOUND IN DB  ///////////////
  const noUser = () => {
    console.log("render...");
    setwhichUser("");
    setlogIn(2);
    setpasswordUserWrong(2);
  };

  const checkPassword = (evt) => {
    console.log("render...");
    evt.preventDefault();
    whichPassword !== whichPasswordDB ? wrongPassword() : goodPassword();
  };

  ///////////////    GET PASSWORD< CLASS< ROLE< ID<     /////////////
  async function getAllData() {
    console.log("render...");
    API.get(`alld/${whichUser}`).then((response) => {
      setwhichClass(response.data[0].class_id);
      setwhichRole(response.data[0].user_role);
      setwhichUserId(response.data[0].id);
      setwhichPasswordDB(response.data[0].user_password);
    });
  }

  //////////////// WRONG PASSWORD HANDLE ///////////////
  const wrongPassword = () => {
    console.log("render...");
    setwhichPassword("");
    setpasswordUserWrong(1);
    setlogIn(3);
  };
  ////////////////  GOOD PASSWORD ///////////////
  const goodPassword = () => {
    console.log("render...");
    setlogIn(1);
    Swal.fire({
      title: "Perfect!",
      text: "You managed to log in",
      icon: "success",
      confirmButtonText: "Cool",
    });
  };

  ////////////// SET FOCUS ON FORM /////////////
  const useFocus = () => {
    console.log("render...");
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };
    return [htmlElRef, setFocus];
  };
  const [inputRef, setInputFocus] = useFocus();

  /////////////  CHANGING THE CLASS IF INSTRUCTOR CHANGES   /////////
  const newClass = (classIdNew) => {
    console.log("render...");
    setwhichClass(classIdNew);
  };
  //////////// SET WINDOW /////////////
  const setWindow = (indexContainer) => {
    console.log("render...");
    setwhichContainer(indexContainer);
  };

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
                className="cancel"
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
        <div className="full-page-loader">
          <img width="200" src="./logo192.png" alt="logo" />
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
          <Suspense
            fallback={
              <div className="full-page-loader">
                <img width="200" src="./logo192.png" alt="logo" />
              </div>
            }
          >
            <MainContainer
              logIn={logIn}
              index={whichContainer}
              userName={whichUser}
              whichClass={whichClass}
              whichRole={whichRole}
              whichUserId={whichUserId}
            />
          </Suspense>
          <Footer />
        </div>
      )}
    </>
  );
}
export default React.memo(App);
//React Suspense allows you to suspend components rendering until a condition is met. While waiting, a fallback component is rendered.
