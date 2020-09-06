import React, { useState, useEffect } from "react";

function Links({ userName, logIn, whichClass, whichRole }) {
  const [linksGeneral, setlinksGeneral] = useState(false);
  const [linksPersonal, setlinksPersonal] = useState(false);
  const [links, setlinks] = useState(false);
  const [GLinkSaved, setGLinkSaved] = useState(false);
  let savedGeneralLink;
  let savedPersonalLink;
  console.log("role links" + whichRole);
  useEffect(() => {
    getuserlinksGeneral();
    getuserlinksPersonal();
  }, [logIn]);
  function getuserlinksGeneral() {
    let endpoint = "http://localhost:3001/userlinks/".concat(whichClass);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const arrToDescription = data.map(function (daten) {
          return daten.description;
        });
        setlinksGeneral(arrToDescription);
      });
  }
  function getuserlinksPersonal() {
    let endpoint = "http://localhost:3001/userpersonallinks/".concat(userName);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const arrToDescription = data.map(function (daten) {
          return daten.description;
        });
        setlinksPersonal(arrToDescription);
      });
  }

  {
    linksGeneral === false
      ? (savedGeneralLink = ["https://migrateam.github.io/dashy/"])
      : (savedGeneralLink = linksGeneral);
  }
  {
    linksPersonal === false
      ? (savedPersonalLink = ["https://migrateam.github.io/dashy/"])
      : (savedPersonalLink = linksPersonal);
  }

  const [linkFromInput, setLinkFromInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputChange = (event) => {
    setLinkFromInput(event.target.value);
  };
  const createGLink = () => {
    if (linkFromInput !== "") {
      setErrorMessage("");
      setGLinkSaved(savedGeneralLink.concat(linkFromInput));
    } else {
      setErrorMessage("Please enter a link");
    }
  };

  return (
    <div className="tabcontent">
      <div id="links">
        <div className="contLinks">
          <input
            className="inputLinks"
            type="text"
            placeholder="Save your link"
            value={linkFromInput}
            onChange={handleInputChange}
          />
          {errorMessage ? (
            <a href="https://migrateam.github.io/dashy/">{errorMessage}</a>
          ) : null}
          <button className="buttonHWL" onClick={createGLink}>
            Save
          </button>
        </div>
        <h4>General Links</h4>
        <div className="linksContainer">
          {savedGeneralLink.map((link, index) => {
            return (
              <div className="rowHW" key={"divRHW" + index}>
                <div className="recordings" key={"divG" + index}>
                  <a href={link} target="_blank" key={index}>
                    {link}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <h4>Personal links</h4>
        <div className="linksContainer">
          {savedPersonalLink.map((link, index) => {
            return (
              <div className="rowHW" key={"divRHW" + index}>
                <div className="recordings" key={"divP" + index}>
                  <a href={link} target="_blank" key={index}>
                    {link}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Links;
