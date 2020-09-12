import React, { useState, useEffect } from "react";

function Links({ userName, logIn, whichClass, whichRole, whichUserId }) {
  const [linksInsertFieldG, setlinksInsertFieldG] = useState("");
  const [linksInsertFieldP, setlinksInsertFieldP] = useState("");
  const [linksGeneral, setlinksGeneral] = useState([
    "https://migrateam.github.io/dashy/",
  ]);
  const [linksPersonal, setlinksPersonal] = useState([
    "https://migrateam.github.io/dashy/",
  ]);

  let savedGeneralLink = linksGeneral;
  let savedPersonalLink = linksPersonal;
  //console.log("role links" + whichUserId);
  useEffect(() => {
    getuserlinksGeneral();
    getuserlinksPersonal();
  }, [logIn]);
  useEffect(() => {
    getuserlinksPersonal();
  }, [linksInsertFieldP]);
  useEffect(() => {
    getuserlinksGeneral();
  }, [linksInsertFieldG]);
  /////////    GET GENERAL LINKS     ///////////
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
  /////////    GET PERSONAL LINKS     ///////////
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
  /////////    POST PERSONAL LINKS     ///////////
  function insertPersonalLink() {
    const data = { link: linksInsertFieldP };
    fetch("http://localhost:3001/postpersonallink/".concat(whichUserId), {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setlinksInsertFieldP("");
  }

  /////////    POST GENERAL LINKS     ///////////
  function insertGeneralLink() {
    const data = { link: linksInsertFieldG };
    let endpoint = "http://localhost:3001/postgenerallink/".concat(whichClass);
    console.log(endpoint);
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setlinksInsertFieldG("");
  }

  return (
    <div className="tabcontent">
      <div className="infoWindow">
        <span>
          You have {linksGeneral.length} general links and{" "}
          {linksPersonal.length} personal links
        </span>
      </div>
      <div id="links">
        <div
          className={
            whichRole === "Instructor" ? "contLinks" : "contLinkshidden"
          }
        >
          <input
            className="inputLinks"
            type="text"
            placeholder="General links"
            value={linksInsertFieldG}
            onChange={(e) => setlinksInsertFieldG(e.target.value)}
            required
          />

          <button className="buttonHWL" onClick={insertGeneralLink}>
            ⇚ Insert a general link
          </button>
        </div>

        <div className="linksContainer">
          {savedGeneralLink.map((link, index) => {
            return (
              <div className="rowHW" key={"divRHW" + index}>
                <div className="recordings" key={"divG" + index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    {link}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="contLinks">
          <input
            className="inputLinks"
            type="text"
            placeholder="Personal links"
            value={linksInsertFieldP}
            onChange={(e) => setlinksInsertFieldP(e.target.value)}
            required
          />
          <button className="buttonHWL" onClick={insertPersonalLink}>
            ⇚ Insert a personal link
          </button>
        </div>
        <div className="linksContainer">
          {savedPersonalLink.map((link, index) => {
            return (
              <div className="rowHW" key={"divRHW" + index}>
                <div className="recordings" key={"divP" + index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
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
