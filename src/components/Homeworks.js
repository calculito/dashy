import React, { useState, useEffect } from "react";

function Homeworks({ userName, logIn, whichRole, whichClass }) {
  console.log(whichRole);
  const [homeworkDescriptionSYes, sethomeworkDescriptionSYes] = useState(false);
  const [homeworkDescriptionSNo, sethomeworkDescriptionSNo] = useState(false);
  const [homeworkDescriptionALL, sethomeworkDescriptionALL] = useState(false);
  const [homeworkStatus, sethomeworkStatus] = useState(false);
  const [homeworkStudentName, sethomeworkStudentName] = useState(false);
  useEffect(() => {
    getuserhomeworksStudentYes();
    getuserhomeworksStudentNo();
    getuserhomeworksALL();
    //getuserhomeworksInstructor();
  }, [logIn]);
  function getuserhomeworksStudentYes() {
    let endpoint = "http://localhost:3001/userhomeworksSYES/".concat(userName);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const arrToDescription = data.map(function (daten) {
          return daten.link;
        });
        sethomeworkDescriptionSYes(arrToDescription);
        const arrToStatus = data.map(function (daten) {
          return daten.finished;
        });
        sethomeworkStatus(arrToStatus);
      });
  }
  function getuserhomeworksStudentNo() {
    let endpoint = "http://localhost:3001/userhomeworksSNO/".concat(userName);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const arrToDescription = data.map(function (daten) {
          return daten.link;
        });
        sethomeworkDescriptionSNo(arrToDescription);
        const arrToStatus = data.map(function (daten) {
          return daten.finished;
        });
        sethomeworkStatus(arrToStatus);
      });
  }
  function getuserhomeworksALL() {
    let endpoint = "http://localhost:3001/userhomeworksALL/".concat(whichClass);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const arrToDescription = data.map(function (daten) {
          return daten.link;
        });
        sethomeworkDescriptionALL(arrToDescription);
        const arrToStatus = data.map(function (daten) {
          return daten.finished;
        });
        sethomeworkStatus(arrToStatus);
        const arrToStudentName = data.map(function (daten) {
          return daten.name;
        });
        sethomeworkStudentName(arrToStudentName);
      });
  }

  const finished = () => {
    alert("GOOD WORK");
  };
  let finishedHomeworks;
  let unfinishedHomeworks;
  let allHomeworks;
  {
    homeworkDescriptionSYes === false
      ? (finishedHomeworks = ["homework finished"])
      : (finishedHomeworks = homeworkDescriptionSYes);
  }
  {
    homeworkDescriptionSNo === false
      ? (unfinishedHomeworks = ["homework unfinished"])
      : (unfinishedHomeworks = homeworkDescriptionSNo);
  }
  {
    homeworkDescriptionALL === false
      ? (allHomeworks = ["homework all"])
      : (allHomeworks = homeworkDescriptionALL);
  }
  return (
    <div className="tabcontent">
      {whichRole === "Student" ? (
        <div className="tabcontent">
          <h4>Finished homeworks</h4>
          <div className="linksContainer">
            {finishedHomeworks.map((link, index) => {
              return (
                <div className="rowHW" key={"divRHW" + index}>
                  <div className="recordings" key={"divG" + index}>
                    <a
                      className="linkToHomework"
                      href={link}
                      target="_blank"
                      key={index}
                    >
                      {link}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <h4>Unfinished homeworks</h4>
          <div className="linksContainer">
            {unfinishedHomeworks.map((link, index) => {
              return (
                <div className="rowHW" key={"divRHWu" + index}>
                  <div className="recordings" key={"divP" + index}>
                    <a
                      className="linkToHomework"
                      href={link}
                      target="_blank"
                      key={index}
                    >
                      {link}
                    </a>
                  </div>
                  <button className="buttonHW" onClick={finished}>
                    Finished?
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="tabcontent">
          <h4>All homeworks</h4>
          <div className="linksContainer">
            {allHomeworks.map((link, index) => {
              return (
                <div className="rowHW" key={"divRHW" + index}>
                  <div className="recordings" key={"divG" + index}>
                    <a
                      className="linkToHomework"
                      href={link}
                      target="_blank"
                      key={index}
                    >
                      {link}
                    </a>
                  </div>
                  <div className="rowHW" key={"divRHWStatus" + index}>
                    <button
                      className="buttonHW"
                      style={{
                        backgroundColor:
                          homeworkStatus[index] == "no" ? "red" : "green",
                      }}
                    >
                      {homeworkStudentName[index]}
                    </button>
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
