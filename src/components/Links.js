import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import Stars from "./Stars";
import sound from "../images/sound.png";
import starblack from "../images/starblack.png";
import stargold from "../images/stargold.png";
import { render } from "@testing-library/react";

function Links({ userName, logIn, whichClass, whichRole, whichUserId }) {
  const { speak } = useSpeechSynthesis();
  const [switcher, setswitcher] = useState("");
  const [linksInsertFieldG, setlinksInsertFieldG] = useState("");
  const [linksInsertFieldP, setlinksInsertFieldP] = useState("");
  const [linksGeneral, setlinksGeneral] = useState([
    "https://migrateam.github.io/dashy/",
  ]);
  const [linksPersonal, setlinksPersonal] = useState([
    "https://migrateam.github.io/dashy/",
  ]);
  const [linksPersonalId, setlinksPersonalId] = useState([1]);
  const [linksGeneralId, setlinksGeneralId] = useState([1]);
  const [linkToDelete, setlinkToDelete] = useState(1);
  const [starsPersonalLinks, setstarsPersonalLinks] = useState([1]);
  const [starsGeneralLinks, setstarsGeneralLinks] = useState([1]);
  let savedGeneralLink = linksGeneral;
  let savedPersonalLink = linksPersonal;
  //console.log("role links" + whichUserId);
  useEffect(() => {
    getuserlinksGeneral();
    getuserlinksPersonal();
    setlinkToDelete("");
    setswitcher("");
  }, [logIn, linkToDelete, switcher]);
  useEffect(() => {
    getuserlinksPersonal();
  }, [linksInsertFieldP, linkToDelete]);
  useEffect(() => {
    getuserlinksGeneral();
  }, [linksInsertFieldG, linkToDelete]);
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
        const arrToLinkId = data.map(function (daten) {
          return daten.id;
        });
        setlinksGeneralId(arrToLinkId);
        const arrToStars = data.map(function (daten) {
          return daten.stars;
        });
        setstarsGeneralLinks(arrToStars);
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
        const arrToLinkId = data.map(function (daten) {
          return daten.id;
        });
        setlinksPersonalId(arrToLinkId);
        const arrToStars = data.map(function (daten) {
          return daten.stars;
        });
        setstarsPersonalLinks(arrToStars);
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
    //console.log(endpoint);
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setlinksInsertFieldG("");
  }
  /////////    DELETE GENERAL LINKS     ///////////
  function deleteGeneralLink(linktodelete) {
    setlinkToDelete(linktodelete);
    const data = { link: linktodelete };
    //navigator.clipboard.writeText(linktodelete);
    fetch("http://localhost:3001/deletegenlink/", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  }
  /////////    DELETE PERSONAL LINKS     ///////////
  function deletePersonalLink(linktodelete) {
    setlinkToDelete(linktodelete);
    let data = { link: linktodelete };
    //navigator.clipboard.writeText(linktodelete);
    fetch("http://localhost:3001/deletepersonallink/", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  }
  ///////////////    CHANGE STARS PERSONAL LINKS       /////////////
  function changestarspers(e, id) {
    setlinkToDelete(e);
    let data = { link: e };
    fetch("http://localhost:3001/personallinkstars/".concat(id), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setswitcher("1");
  }
  ///////////////    CHANGE STARS GENERAL LINKS       /////////////
  function changestars(e, id) {
    setlinkToDelete(e);
    let data = { link: e };
    fetch("http://localhost:3001/generallinkstars/".concat(id), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  }
  ///////////  SOUND READ LOUD  /////////////
  function soundloud(toread) {
    speak({
      text: toread,
    });
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
        <div className="contLinks">
          <input
            className="inputLinks"
            type="text"
            placeholder="General links"
            value={linksInsertFieldG}
            onChange={(e) => setlinksInsertFieldG(e.target.value)}
            required
          />
          {whichRole === "Instructor" && (
            <button className="buttonHWL" onClick={insertGeneralLink}>
              ⇚ Insert a general link
            </button>
          )}
        </div>

        <div className="linksContainer">
          {savedGeneralLink.map((link, index) => {
            return (
              <div className="rowHW" key={"divRHW" + index}>
                <div className="recordings" key={"divG" + index}>
                  <a
                    className="recordinglinks"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    {link}
                  </a>
                  <div className="infoContLinks">
                    {whichRole === "Instructor" && (
                      <span
                        className="circle"
                        onClick={(e) =>
                          deleteGeneralLink(linksGeneralId[index])
                        }
                      >
                        DEL
                      </span>
                    )}
                    <span className="circle">{index + 1}</span>
                    <div>
                      <img
                        className="linkSymbols"
                        src={
                          starsGeneralLinks[index] > 0 ? stargold : starblack
                        }
                        alt="star"
                        onClick={(e) => changestars(1, linksGeneralId[index])}
                      />
                      <img
                        className="linkSymbols"
                        src={
                          starsGeneralLinks[index] > 1 ? stargold : starblack
                        }
                        alt="star"
                        onClick={(e) => changestars(2, linksGeneralId[index])}
                      />
                      <img
                        className="linkSymbols"
                        src={
                          starsGeneralLinks[index] > 2 ? stargold : starblack
                        }
                        alt="star"
                        onClick={(e) => changestars(3, linksGeneralId[index])}
                      />
                      <img
                        className="linkSymbols"
                        src={
                          starsGeneralLinks[index] > 3 ? stargold : starblack
                        }
                        alt="star"
                        onClick={(e) => changestars(4, linksGeneralId[index])}
                      />
                      <img
                        className="linkSymbols"
                        src={
                          starsGeneralLinks[index] > 4 ? stargold : starblack
                        }
                        alt="star"
                        onClick={(e) => changestars(5, linksGeneralId[index])}
                      />
                    </div>
                    <img
                      className="linkSymbols"
                      src={sound}
                      alt="speaker"
                      onClick={(e) => soundloud(link)}
                    />
                  </div>
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
                    className="recordinglinks"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    {link}
                  </a>
                  <div className="infoContLinks">
                    <span
                      className="circle"
                      onClick={(e) =>
                        deletePersonalLink(linksPersonalId[index])
                      }
                    >
                      DEL
                    </span>

                    <div>
                      <img
                        className="linkSymbols"
                        src={
                          starsPersonalLinks[index] > 0 ? stargold : starblack
                        }
                        alt="star"
                        onClick={(e) =>
                          changestarspers(1, linksPersonalId[index])
                        }
                      />
                      <img
                        className="linkSymbols"
                        src={
                          starsPersonalLinks[index] > 1 ? stargold : starblack
                        }
                        alt="star"
                        onClick={(e) =>
                          changestarspers(2, linksPersonalId[index])
                        }
                      />
                      <img
                        className="linkSymbols"
                        src={
                          starsPersonalLinks[index] > 2 ? stargold : starblack
                        }
                        alt="star"
                        onClick={(e) =>
                          changestarspers(3, linksPersonalId[index])
                        }
                      />
                      <img
                        className="linkSymbols"
                        src={
                          starsPersonalLinks[index] > 3 ? stargold : starblack
                        }
                        alt="star"
                        onClick={(e) =>
                          changestarspers(4, linksPersonalId[index])
                        }
                      />
                      <img
                        className="linkSymbols"
                        src={
                          starsPersonalLinks[index] > 4 ? stargold : starblack
                        }
                        alt="star"
                        onClick={(e) =>
                          changestarspers(5, linksPersonalId[index])
                        }
                      />
                    </div>
                    <img
                      className="linkSymbols"
                      src={sound}
                      alt="speaker"
                      onClick={(e) => soundloud(link)}
                    />
                  </div>
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
