import React, { useState } from "react";

function Links({ userName }) {
  console.log("username" + userName); //name of the current user passed from app.js

  const [savedGeneralLink, setGLinkSaved] = useState([
    "https://github.com/Jose-cod7/tutorials/tree/sql-tutorial/sql",
  ]);
  const [savedPersonalLink, setPLinkSaved] = useState([
    "https://github.com/Jose-cod7/tutorials/tree/sql-tutorial/sql",
    "https://reactjs.org/tutorial/tutorial.html",
    "https://www.postgresql.org/docs/12/datatype.html",
  ]);
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
        <div className="infoWindow">
          Hello {userName}, you have {savedGeneralLink.length} general links and{" "}
          {savedPersonalLink.length} personal links
        </div>
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
          <button className="buttonHW" onClick={createGLink}>
            Save
          </button>
        </div>
        <h4>General Links</h4>
        <div className="linksContainer">
          {savedGeneralLink.map((link, index) => {
            return (
              <div className="recordings" key={"divG" + index}>
                <button href={linkFromInput} target="blank" key={index}>
                  {link}
                </button>
              </div>
            );
          })}
        </div>

        <h4>Personal links</h4>
        <div className="linksContainer">
          {savedPersonalLink.map((link, index) => {
            return (
              <div className="recordings" key={"divP" + index}>
                <button href={linkFromInput} target="blank" key={index}>
                  {link}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Links;
