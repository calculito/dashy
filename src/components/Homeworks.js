import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { sound, hammerwhite, hammercolor } from "./Impex";
import axios from "axios";

export default function Homeworks({
  userName,
  logIn,
  whichRole,
  whichClass,
  whichUserId,
}) {
  const { speak } = useSpeechSynthesis();
  const [switcher, setswitcher] = useState("");
  const [homeworkHammerInst, sethomeworkHammerInst] = useState([
    { id: 1, avg: "3" },
  ]);
  const [numberOfYes, setnumberOfYes] = useState("");
  const [homeworkToCheckId, sethomeworkToCheckId] = useState("");
  const [homeworkInsertField, sethomeworkInsertField] = useState("");
  const [linkToMyHomework, setlinkToMyHomework] = useState("");
  const [thishomeworkFinishedId, setthishomeworkFinishedId] = useState("");
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

  const [appState, setAppState] = useState({
    loading: null,
    finishedHW: null,
    unfinishedHW: null,
    homeworkHammerInst: null,
  });
  const [openCheckWindow, setopenCheckWindow] = useState(false);
  const [openInputWindow, setopenInputWindow] = useState(false);
  const [openInputWindowAfter, setopenInputWindowAfter] = useState(false);
  useEffect(() => {
    getuserhomeworksALL();
    setswitcher("");
  }, [logIn, switcher, whichClass]);

  useEffect(() => {
    ///////////////    GET FINISHED HOMEWORKS FOR STUDENTS     /////////////
    axios
      .all([
        axios.get(
          `https://dashybackend.herokuapp.com/userhomeworksSYES/${userName}`
        ),
        axios.get(
          `https://dashybackend.herokuapp.com/userhomeworksSNO/${userName}`
        ),
        axios.get(`https://dashybackend.herokuapp.com/userhomeworksALLHammer`),
      ])
      .then((response) => {
        setAppState({
          loading: false,
          finishedHW: response[0].data,
          unfinishedHW: response[1].data,
          homeworkHammerInst: response[2].data,
        });
      });
    appState.loading &&
      appState.finishedHW.map(function (daten) {
        if (daten.validation === "yes") {
          numberOfYes++;
        }
        setnumberOfYes(numberOfYes);
      });
  }, [setAppState, switcher, openInputWindow]);

  ///////////////    GET HOMEWORKS FOR INSTRUCTORS       /////////////
  async function getuserhomeworksALL() {
    let endpoint = "https://dashybackend.herokuapp.com/userhomeworksALL/".concat(
      whichClass
    );
    await fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const homeworkDescriptionALLReq = data.reduce((acc, d) => {
          const found = acc.find((a) => a.link === d.link);
          const value = {
            name: d.name,
            finished: d.finished,
            linktohw: d.linkhwfinished,
            hammer: d.hammer,
            validation: d.validation,
            uid: d.uid,
            hwfinid: d.hfid,
          };
          if (!found) {
            acc.push({
              link: d.link,
              data: [value],
              optional: d.optional,
              id: d.id,
            });
          } else {
            found.data.push(value);
            // found.data.push(d.id);
          }
          return acc;
        }, []);
        sethomeworkDescriptionALLR(homeworkDescriptionALLReq);
      });
  }
  console.log(appState.homeworkHammerInst);
  const HammerShowInstructor = (props) => {
    let id = props.id;
    console.log(id);
    var hammernr = appState.homeworkHammerInst.map((data) => {
      return data.id === id && data.avg;
    });
    console.log(hammernr);
    return <div className="hammercontainer">{hammernr}</div>;
  };
  ///////////////    CHANGE STATUS TO FINISHED        /////////////
  async function changestatus(e) {
    const data = { userId: whichUserId };
    let homeworkId = homeworkUnfinishedIdArray[e];
    sethomeworkUnfinishedId(homeworkId);
    await fetch(
      "https://dashybackend.herokuapp.com/homeworkfinished/".concat(homeworkId),
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    setopenInputWindow(e);
  }
  ///////////////    INSERT LINK TO HOMEWORK IF (NO LINK)       /////////////
  function changestatusafter(e) {
    setthishomeworkFinishedId(e);
    setopenInputWindowAfter(e);
    // setswitcher("1");
  }
  async function saveLinkToHomeworkAfter(evt) {
    evt.preventDefault();
    const data = { link: linkToMyHomework, userId: whichUserId };
    let endlink = "https://dashybackend.herokuapp.com/homeworkfinishedlinkafter/".concat(
      thishomeworkFinishedId
    );
    linkToMyHomework !== "" &&
      (await fetch(endlink, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }));
    setthishomeworkFinishedId("");
    setlinkToMyHomework("");
    setopenInputWindowAfter(false);
    setswitcher("1");
  }
  ///////////////    CHANGE STATUS TO OPTIONAL       /////////////
  async function changeOptional(index) {
    let hwId = homeworkDescriptionALLR[index].id;
    let hwOpt = homeworkDescriptionALLR[index].optional;
    {
      hwOpt === "yes" ? (hwOpt = "no") : (hwOpt = "yes");
    }
    const data = { optional: hwOpt };
    await fetch(
      "https://dashybackend.herokuapp.com/homeworkoptional/".concat(hwId),
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    setswitcher("1");
  }
  ////////////////  SAVE LINK TO HOMEWORK FROM FORM  //////////////
  async function saveLinkToHomework(evt) {
    evt.preventDefault();

    let homeworkId2 = homeworkUnfinishedId;
    const data = { link: linkToMyHomework, userId: whichUserId };
    let endlink = "https://dashybackend.herokuapp.com/homeworkfinishedlink/".concat(
      homeworkId2
    );
    linkToMyHomework !== "" &&
      (await fetch(endlink, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }));
    sethomeworkUnfinishedId("");
    setlinkToMyHomework("");
    setopenInputWindow(false);
    setswitcher("1");
  }
  /////////    POST HOMEWORK AS INSTRUCTOR    ///////////
  async function insertHomework(evt) {
    evt.preventDefault();
    const data = { link: homeworkInsertField };
    let endpoint = "https://dashybackend.herokuapp.com/posthomework/".concat(
      whichClass
    );
    await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    sethomeworkInsertField("");
    setswitcher("1");
  }
  ///////////////    CHANGE HAMMER HOMEWORK FINISHED FOR STUDENTS      /////////////
  async function changehammer(e, id) {
    let data = { numberHammer: e };
    await fetch(
      "https://dashybackend.herokuapp.com/hammerstudents/".concat(id),
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    setswitcher("1");
  }
  ////////////////  PREPARE ARRAYS FOR GETTING DATA FROM DATABASE  //////////////
  let allHomeworks = homeworkDescriptionALLR;
  function soundloud(toread) {
    speak({
      text: toread,
    });
  }
  function openRequestedLink(link, hwid) {
    console.log(link);
    sethomeworkToCheckId(hwid);
    setopenCheckWindow(true);
    link !== null
      ? window.open(link, "_blank", "noopener, noreferrer")
      : alert("No link available");
  }
  function homeworkOk(evt) {
    evt.preventDefault();
    let answer = "yes";
    homeworkEvaluation(answer);
    sethomeworkToCheckId("");
    setopenCheckWindow(false);
  }
  function homeworkNotOk(evt) {
    evt.preventDefault();
    let answer = "no";
    homeworkEvaluation(answer);
    sethomeworkToCheckId("");
    setopenCheckWindow(false);
  }
  function cancel(evt) {
    evt.preventDefault();
    sethomeworkToCheckId("");
    setopenCheckWindow(false);
  }
  async function homeworkEvaluation(answer) {
    let data = {
      answer: answer,
    };
    await fetch(
      "https://dashybackend.herokuapp.com/homeworkevaluation/".concat(
        homeworkToCheckId
      ),
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    setswitcher("1");
  }
  async function homeworkEvaluationReset(hwId) {
    let data = {
      answer: "NULL",
    };
    await fetch(
      "https://dashybackend.herokuapp.com/homeworkevaluation/".concat(hwId),
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    setswitcher("1");
  }

  return (
    <div className="tabcontent">
      <div className="infoWindow">
        {appState.loading === false
          ? whichRole !== "Student"
            ? "Your class has " + homeworkDescriptionALLR.length + " homeworks"
            : "You have " +
              appState.finishedHW.length +
              " finished homework(s) and " +
              appState.unfinishedHW.length +
              " unfinished homework(s) and you achieved " +
              (appState.finishedHW.length * 5 + numberOfYes * 3) +
              " points from max. " +
              (appState.finishedHW.length + appState.unfinishedHW.length) * 8
          : undefined}
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
      {openInputWindowAfter !== false && (
        <div className="outPopUp">
          <form className="form-container" onSubmit={saveLinkToHomeworkAfter}>
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
        <div className="twoColumns">
          <div className="halfContainer">
            <h4>Finished homeworks</h4>
            {appState.loading === false
              ? appState.finishedHW.map((data, index) => {
                  return (
                    <div className="rowHW" key={"divRHW" + index}>
                      <div className="recordings" key={"divG" + index}>
                        <a
                          className="recordinglinks"
                          href={data.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={index}
                        >
                          {`${data.link.substring(0, 30)}...`}
                        </a>

                        <div className="infoContLinks">
                          <div className="hammercontainer">
                            <img
                              className="linkSymbols"
                              src={data.hammer > 0 ? hammercolor : hammerwhite}
                              alt="hammer"
                              onClick={(e) => changehammer(1, data.id)}
                            />
                            <img
                              className="linkSymbols"
                              src={data.hammer > 1 ? hammercolor : hammerwhite}
                              alt="hammer"
                              onClick={(e) => changehammer(2, data.id)}
                            />
                            <img
                              className="linkSymbols"
                              src={data.hammer > 2 ? hammercolor : hammerwhite}
                              alt="hammer"
                              onClick={(e) => changehammer(3, data.id)}
                            />
                            <img
                              className="linkSymbols"
                              src={data.hammer > 3 ? hammercolor : hammerwhite}
                              alt="hammer"
                              onClick={(e) => changehammer(4, data.id)}
                            />
                            <img
                              className="linkSymbols"
                              src={data.hammer > 4 ? hammercolor : hammerwhite}
                              alt="hammer"
                              onClick={(e) => changehammer(5, data.id)}
                            />
                          </div>
                          <button
                            onClick={(e) =>
                              data.validation === "no"
                                ? homeworkEvaluationReset(data.id)
                                : undefined
                            }
                            style={{
                              backgroundColor:
                                data.validation === "yes"
                                  ? "green"
                                  : data.validation === "no"
                                  ? "red"
                                  : "white",
                            }}
                            className="circle"
                          >
                            V
                          </button>
                          {data.linkhwfinished === null ? (
                            <button
                              onClick={(e) => changestatusafter(data.id)}
                              className="circle"
                              href=""
                            >
                              no link
                            </button>
                          ) : (
                            <>
                              <a
                                className="circle"
                                href={data.linkhwfinished}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                link ok
                              </a>

                              <button
                                onClick={(e) => changestatusafter(index)}
                                className="circle"
                                href=""
                              >
                                change link
                              </button>
                            </>
                          )}
                          <span
                            className="circle"
                            style={{
                              backgroundColor:
                                data.optional === "yes" && "green",
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
                            onClick={(e) => soundloud(data.link)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              : undefined}
          </div>
          <div className="halfContainer">
            <h4>Unfinished homeworks</h4>
            {appState.loading === false
              ? appState.unfinishedHW.map((data, index) => {
                  return (
                    <div className="rowHW" key={"divRHWu" + index}>
                      <div className="recordings" key={"divP" + index}>
                        <a
                          className="recordinglinks"
                          href={data.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={index}
                        >
                          {`${data.link.substring(0, 30)}...`}
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
                                data.optional === "yes" && "green",
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
                            onClick={(e) => soundloud(data.link)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              : undefined}
          </div>
        </div>
      ) : (
        <div className="halfContainer">
          <div
            className={
              whichRole !== "Student" ? "contLinks" : "contLinkshidden"
            }
          >
            <form className="cancelAndForgot">
              <input
                className="inputLinks"
                type="text"
                placeholder="Homeworks"
                value={homeworkInsertField}
                onChange={(e) => sethomeworkInsertField(e.target.value)}
                required
              />

              <button
                className="buttonHW"
                onClick={
                  homeworkInsertField !== "" ? insertHomework : undefined
                }
              >
                ⇚ Insert a homework
              </button>
            </form>
          </div>
          <div className="tabcontent">
            <div className="linksContainer">
              {openCheckWindow !== false ? (
                <div className="outPopUpHomeworkCheck">
                  <form className="HomeworkCheck">
                    <div>
                      Please check the homework in the separate window and click
                      on the corresponding button below!
                    </div>
                    <div className="buttonsContainer">
                      <button
                        className="buttonHW"
                        onClick={(e) => homeworkOk(e)}
                      >
                        Homework OK
                      </button>
                      <button
                        className="buttonHW"
                        onClick={(e) => homeworkNotOk(e)}
                      >
                        Homework not OK
                      </button>
                      <button className="buttonHW" onClick={(e) => cancel(e)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : undefined}
              {allHomeworks.map((alldata, index) => {
                return (
                  <div className="rowHW" key={"divRHW" + index}>
                    <div className="recordings" key={"divG" + index}>
                      <div className="divRowLeft">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="recordinglinks"
                          href={alldata.link}
                          key={index}
                        >
                          {alldata.link}
                        </a>
                        <div className="circle">
                          {appState.loading === false && (
                            <HammerShowInstructor id={alldata.id} />
                          )}
                        </div>
                      </div>
                      <div className="rowHWPosAbs" key={"divRHWStatus" + index}>
                        {alldata.data.map((data, index) => (
                          <button
                            onClick={(e) =>
                              openRequestedLink(data.linktohw, data.hwfinid)
                            }
                            key={"butRHWStatus" + data.name + index}
                            className="buttonHWNamesA"
                            style={{
                              backgroundColor:
                                data.finished === "yes"
                                  ? data.validation === "yes"
                                    ? "green"
                                    : data.validation === "no"
                                    ? "red"
                                    : "darkorange"
                                  : "white",
                            }}
                          >
                            {data.name}
                            {data.hammer > 0 ? (
                              <div
                                className="circle"
                                style={{
                                  margin: "0",
                                  backgroundColor:
                                    "var(--background-page-color)",
                                }}
                              >
                                {data.hammer}
                              </div>
                            ) : undefined}
                          </button>
                        ))}
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
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
