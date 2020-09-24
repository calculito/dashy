import React, { useState, useEffect, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import sound from "../images/sound.png";
import starblack from "../images/starblack.png";
import stargold from "../images/stargold.png";

export default function Links({
  userName,
  logIn,
  whichClass,
  whichRole,
  whichUserId,
}) {
  let [switcher, setswitcher] = useState("0");
  const { speak } = useSpeechSynthesis();
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
    setswitcher(0);
  }, [
    logIn,
    linkToDelete,
    // switcher,
    whichClass,
    linksInsertFieldP,
    linksInsertFieldG,
  ]);

  ////////////// SET FOCUS ON BUTTON /////////////
  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };
    return [htmlElRef, setFocus];
  };
  const [inputRef, setInputFocus] = useFocus();
  /////////    GET GENERAL LINKS     ///////////
  async function getuserlinksGeneral() {
    let endpoint = "https://dashybackend.herokuapp.com/userlinks/".concat(
      whichClass
    );
    await fetch(endpoint)
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
  async function getuserlinksPersonal() {
    let endpoint = "https://dashybackend.herokuapp.com/userpersonallinks/".concat(
      userName
    );
    await fetch(endpoint)
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
  async function insertPersonalLink(evt) {
    evt.preventDefault();
    const data = { link: linksInsertFieldP };
    await fetch(
      "https://dashybackend.herokuapp.com/postpersonallink/".concat(
        whichUserId
      ),
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    setlinksInsertFieldP("");
  }

  /////////    POST GENERAL LINKS     ///////////
  async function insertGeneralLink(evt) {
    evt.preventDefault();
    const data = { link: linksInsertFieldG };
    let endpoint = "https://dashybackend.herokuapp.com/postgenerallink/".concat(
      whichClass
    );
    await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setlinksInsertFieldG("");
  }
  /////////    DELETE GENERAL LINKS     ///////////
  async function deleteGeneralLink(linktodelete) {
    setlinkToDelete(linktodelete);
    const data = { link: linktodelete };
    //navigator.clipboard.writeText(linktodelete);
    await fetch("https://dashybackend.herokuapp.com/deletegenlink/", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setlinkToDelete("");
  }
  /////////    DELETE PERSONAL LINKS     ///////////
  async function deletePersonalLink(linktodelete) {
    setlinkToDelete(linktodelete);
    let data = { link: linktodelete };
    //navigator.clipboard.writeText(linktodelete);
    await fetch("https://dashybackend.herokuapp.com/deletepersonallink/", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setlinkToDelete("");
  }
  ///////////////    CHANGE STARS PERSONAL LINKS       /////////////
  async function changestarspers(e, id) {
    setlinkToDelete(e);
    let data = { link: e };
    await fetch(
      "https://dashybackend.herokuapp.com/personallinkstars/".concat(id),
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    setswitcher(1);
    setlinkToDelete("");
  }
  ///////////////    CHANGE STARS GENERAL LINKS       /////////////
  async function changestars(e, id) {
    setlinkToDelete(e);
    let data = { link: e };
    await fetch(
      "https://dashybackend.herokuapp.com/generallinkstars/".concat(id),
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    setswitcher(1);
    setlinkToDelete("");
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
          <form className="cancelAndForgot">
            <input
              className="inputLinks"
              type="text"
              placeholder="General links"
              value={linksInsertFieldG}
              onChange={(e) => setlinksInsertFieldG(e.target.value)}
              required
            />
            {whichRole !== "Student" && (
              <button
                className="buttonHW"
                onClick={
                  linksInsertFieldG !== "" ? insertGeneralLink : undefined
                }
              >
                ⇚ Insert a general link
              </button>
            )}
          </form>
        </div>

        <div className="linksContainer">
          {savedGeneralLink.map((link, index) => {
            return (
              <div className="rowHW" key={"divRHW" + index}>
                <div className="recordings" key={"divG" + index}>
                  <div style={{ paddingLeft: "5px" }}>
                    <img
                      src={"https://www.google.com/s2/favicons?domain=".concat(
                        link
                      )}
                    ></img>
                    <a
                      className="recordinglinks"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index}
                    >
                      {link}
                    </a>
                  </div>
                  <div className="infoContLinks">
                    {whichRole === "Instructor" && (
                      <span
                        className="circle"
                        onClick={() => deleteGeneralLink(linksGeneralId[index])}
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
          <form className="cancelAndForgot">
            <input
              className="inputLinks"
              type="text"
              placeholder="Personal links"
              value={linksInsertFieldP}
              onChange={(e) => setlinksInsertFieldP(e.target.value)}
              required
            />
            <button
              className="buttonHW"
              onClick={
                linksInsertFieldP !== "" ? insertPersonalLink : undefined
              }
            >
              ⇚ Insert a personal link
            </button>
          </form>
        </div>
        <div className="linksContainer">
          {savedPersonalLink.map((link, index) => {
            return (
              <div className="rowHW" key={"divRHW" + index}>
                <div className="recordings" key={"divP" + index}>
                  <div style={{ paddingLeft: "5px" }}>
                    <img
                      src={"https://www.google.com/s2/favicons?domain=".concat(
                        link
                      )}
                    ></img>
                    <a
                      className="recordinglinks"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index}
                    >
                      {link}
                    </a>
                  </div>
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
