import React, { useState, useEffect } from "react";
import sound from "../images/sound.png";
import { useSpeechSynthesis } from "react-speech-kit";
import Hammers from "./Hammers";
import hammerwhite from "../images/hammerwhite.png";
import hammercolor from "../images/hammercolor.png";

function Homeworks({ userName, logIn, whichRole, whichClass, whichUserId }) {
  const { speak } = useSpeechSynthesis();
  const [switcher, setswitcher] = useState("");
  const [hammer, sethammer] = useState([1]);
  const [hwOptional, sethwOptional] = useState("");
  const [hwOptionalUn, sethwOptionalUn] = useState("");
  const [homeworkInsertField, sethomeworkInsertField] = useState("");
  const [homeworkDescriptionSYes, sethomeworkDescriptionSYes] = useState([
    "homework finished",
  ]);
  const [homeworkDescriptionSNo, sethomeworkDescriptionSNo] = useState([
    "homework unfinished",
  ]);
  const [linkToMyHomework, setlinkToMyHomework] = useState("");
  const [homeworkFinishedId, sethomeworkFinishedId] = useState("");
  const [linkToMyHomeworkCircle, setlinkToMyHomeworkCircle] = useState("");
  const [homeworkUnfinishedIdArray, sethomeworkUnfinishedIdArray] = useState(
    ""
  );
  const [homeworkUnfinishedId, sethomeworkUnfinishedId] = useState("");
  const [homeworkDescriptionALLR, sethomeworkDescriptionALLR] = useState([
    {
      link: "homework all",
      data: [{ name: "Ion", finished: "yes", linkhwfinished: "test" }],
    },
  ]); //reduced array
  const [openInputWindow, setopenInputWindow] = useState(false);
  useEffect(() => {
    getuserhomeworksStudentYes();
    getuserhomeworksStudentNo();
    getuserhomeworksALL();
    setswitcher("");
  }, [logIn, switcher, whichClass]);

  useEffect(() => {
    getuserhomeworksALL();
  }, [switcher]);

  useEffect(() => {
    getuserhomeworksStudentNo();
    getuserhomeworksStudentYes();
  }, [openInputWindow]);

  ///////////////    GET FINISHED HOMEWORKS FOR STUDENTS     /////////////
  function getuserhomeworksStudentYes() {
    let endpoint = "http://localhost:3001/userhomeworksSYES/".concat(userName);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const arrToDescription = data.map(function (daten) {
          return daten.link;
        });
        sethomeworkDescriptionSYes(arrToDescription);
        const arrToLinkToMyHomeworkCircle = data.map(function (daten) {
          return daten.linkhwfinished;
        });
        setlinkToMyHomeworkCircle(arrToLinkToMyHomeworkCircle);
        const arrToOptional = data.map(function (daten) {
          return daten.optional;
        });
        sethwOptional(arrToOptional);
        const arrTohomeworkFInishedId = data.map(function (daten) {
          return daten.id;
        });
        sethomeworkFinishedId(arrTohomeworkFInishedId);
        const arrToHammer = data.map(function (daten) {
          return daten.hammer;
        });
        sethammer(arrToHammer);
      });
  }
  ///////////////    GET UNFINISHED HOMEWORKS FOR STUDENTS     /////////////
  function getuserhomeworksStudentNo() {
    let endpoint = "http://localhost:3001/userhomeworksSNO/".concat(userName);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const arrToDescription = data.map(function (daten) {
          return daten.link;
        });
        sethomeworkDescriptionSNo(arrToDescription);
        const arrToId = data.map(function (daten) {
          return daten.id;
        });
        sethomeworkUnfinishedIdArray(arrToId);
        const arrToOptionalUn = data.map(function (daten) {
          return daten.optional;
        });
        sethwOptionalUn(arrToOptionalUn);
      });
  }
  ///////////////    GET HOMEWORKS FOR INSTRUCTORS       /////////////
  function getuserhomeworksALL() {
    let endpoint = "http://localhost:3001/userhomeworksALL/".concat(whichClass);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const homeworkDescriptionALLR = data.reduce((acc, d) => {
          const found = acc.find((a) => a.link === d.link);
          //const value = { name: d.name, val: d.value };
          const value = {
            name: d.name,
            finished: d.finished,
            linktohw: d.linkhwfinished,
          }; // the element in data property
          if (!found) {
            //acc.push(...value);
            acc.push({
              link: d.link,
              data: [value],
              optional: d.optional,
              id: d.id,
            }); // not found, so need to add data property
          } else {
            //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
            found.data.push(value); // if found, that means data property exists, so just push new element to found.data.
          }
          return acc;
        }, []);
        sethomeworkDescriptionALLR(homeworkDescriptionALLR);
      });
  }

  ///////////////    CHANGE STATUS TO FINISHED        /////////////
  function changestatus(e) {
    const data = { userId: whichUserId };
    let homeworkId = homeworkUnfinishedIdArray[e];
    sethomeworkUnfinishedId(homeworkId);
    fetch("http://localhost:3001/homeworkfinished/".concat(homeworkId), {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setopenInputWindow(e);
  }
  ///////////////    INSERT LINK TO HOMEWORK IF (NO LINK)       /////////////
  function changestatusafter(e) {
    sethomeworkUnfinishedId(homeworkFinishedId[e]);
    setopenInputWindow(e);
    setswitcher("1");
  }
  ///////////////    CHANGE STATUS TO OPTIONAL       /////////////
  function changeOptional(index) {
    let hwId = homeworkDescriptionALLR[index].id;
    let hwOpt = homeworkDescriptionALLR[index].optional;
    //console.log(hwId, hwOpt);
    {
      hwOpt === "yes" ? (hwOpt = "no") : (hwOpt = "yes");
    }
    console.log(hwId, hwOpt);
    const data = { optional: hwOpt };
    fetch("http://localhost:3001/homeworkoptional/".concat(hwId), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setswitcher("1");
  }
  ////////////////  SAVE LINK TO HOMEWORK FROM FORM  //////////////
  function saveLinkToHomework(evt) {
    evt.preventDefault();

    let homeworkId2 = homeworkUnfinishedId;
    const data = { link: linkToMyHomework, userId: whichUserId };
    let endlink = "http://localhost:3001/homeworkfinishedlink/".concat(
      homeworkId2
    );
    linkToMyHomework !== "" &&
      fetch(endlink, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    sethomeworkUnfinishedId("");
    setlinkToMyHomework("");
    console.log(data, homeworkId2);
    setopenInputWindow(false);
    setswitcher("1");
  }
  /////////    POST HOMEWORK AS INSTRUCTOR    ///////////
  function insertHomework() {
    const data = { link: homeworkInsertField };
    let endpoint = "http://localhost:3001/posthomework/".concat(whichClass);
    //console.log(endpoint);
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setswitcher("1");
    setopenInputWindow(false);
  }
  ///////////////    CHANGE HAMMER HOMEWORK FINISHED FOR STUDENTS      /////////////
  function changehammer(e, id) {
    let data = { numberHammer: e };
    fetch("http://localhost:3001/hammerstudents/".concat(id), {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setswitcher("1");
  }
  ////////////////  PREPARE ARRAYS FOR GETTING DATA FROM DATABASE  //////////////
  let finishedHomeworks = homeworkDescriptionSYes;
  let unfinishedHomeworks = homeworkDescriptionSNo;
  let allHomeworks = homeworkDescriptionALLR;
  function soundloud(toread) {
    speak({
      text: toread,
    });
  }

  return (
    <div className="tabcontent">
      <div className="infoWindow">
        {whichRole === "Instructor"
          ? "Your class has " + homeworkDescriptionALLR.length + " homeworks"
          : "You have " +
            homeworkDescriptionSYes.length +
            " finished homeworks and " +
            homeworkDescriptionSNo.length +
            " unfinished homeworks"}
      </div>
      <div
        className={whichRole === "Instructor" ? "contLinks" : "contLinkshidden"}
      >
        <input
          className="inputLinks"
          type="text"
          placeholder="New homework"
          value={homeworkInsertField}
          onChange={(e) => sethomeworkInsertField(e.target.value)}
          required
        />

        <button className="buttonHWL" onClick={insertHomework}>
          ⇚ Insert a homework
        </button>
      </div>
      {openInputWindow !== false && (
        <div className="outPopUp">
          <form className="form-container" onSubmit={saveLinkToHomework}>
            <label>
              Link to your homework:
              <input
                autoFocus
                type="text"
                placeholder="Enter link to your homework"
                value={linkToMyHomework}
                onChange={(e) => setlinkToMyHomework(e.target.value)}
              />
            </label>
            <input type="submit" value="Submit" className="btn" />
          </form>
        </div>
      )}
      {whichRole === "Student" ? (
        <div className="tabcontent">
          <div className="linksContainer">
            {finishedHomeworks.map((link, index) => {
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
                      <div>
                        <img
                          className="linkSymbols"
                          src={hammer[index] > 0 ? hammercolor : hammerwhite}
                          alt="hammer"
                          onClick={(e) =>
                            changehammer(1, homeworkFinishedId[index])
                          }
                        />
                        <img
                          className="linkSymbols"
                          src={hammer[index] > 1 ? hammercolor : hammerwhite}
                          alt="hammer"
                          onClick={(e) =>
                            changehammer(2, homeworkFinishedId[index])
                          }
                        />
                        <img
                          className="linkSymbols"
                          src={hammer[index] > 2 ? hammercolor : hammerwhite}
                          alt="hammer"
                          onClick={(e) =>
                            changehammer(3, homeworkFinishedId[index])
                          }
                        />
                        <img
                          className="linkSymbols"
                          src={hammer[index] > 3 ? hammercolor : hammerwhite}
                          alt="hammer"
                          onClick={(e) =>
                            changehammer(4, homeworkFinishedId[index])
                          }
                        />
                        <img
                          className="linkSymbols"
                          src={hammer[index] > 4 ? hammercolor : hammerwhite}
                          alt="hammer"
                          onClick={(e) =>
                            changehammer(5, homeworkFinishedId[index])
                          }
                        />
                      </div>
                      {linkToMyHomeworkCircle[index] === null ? (
                        <button
                          onClick={(e) => changestatusafter(index)}
                          className="circle"
                          href=""
                        >
                          no link
                        </button>
                      ) : (
                        <a
                          className="circle"
                          href={linkToMyHomeworkCircle[index]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          link ok
                        </a>
                      )}
                      <span
                        className="circle"
                        style={{
                          backgroundColor:
                            hwOptional[index] === "yes" && "green",
                          color: "white",
                          fontSize: "12px",
                          cursor: "default",
                        }}
                      >
                        OPT
                      </span>

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
          <div className="linksContainer">
            {unfinishedHomeworks.map((link, index) => {
              return (
                <div className="rowHW" key={"divRHWu" + index}>
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
                      <button
                        className="buttonHW"
                        key={index}
                        onClick={(e) => changestatus(index)}
                      >
                        Finished?
                      </button>
                      <span
                        className="circle"
                        style={{
                          backgroundColor:
                            hwOptionalUn[index] === "yes" && "green",
                          color: "white",
                          fontSize: "12px",
                          cursor: "default",
                        }}
                      >
                        OPT
                      </span>

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
      ) : (
        <div className="tabcontent">
          <div className="linksContainer">
            {allHomeworks.map((alldata, index) => {
              return (
                <div className="rowHW" key={"divRHW" + index}>
                  <div className="recordings" key={"divG" + index}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="recordinglinks"
                      href={alldata.link}
                      key={index}
                    >
                      {alldata.link}
                    </a>
                    <div className="rowHWPosAbs" key={"divRHWStatus" + index}>
                      <span
                        className="circle"
                        onClick={(e) => changeOptional(index)}
                        style={{
                          backgroundColor:
                            alldata.optional === "yes" && "green",
                          color: "white",
                          fontSize: "12px",
                        }}
                      >
                        OPT
                      </span>
                      <Hammers index={index + 2} />
                      {alldata.data.map((data, index) => (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          key={"butRHWStatus" + data.name + index}
                          href={data.linktohw}
                          className="buttonHWNamesA"
                          style={{
                            backgroundColor:
                              data.finished === "yes" ? "green" : "red",
                          }}
                        >
                          {data.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
export default Homeworks;
