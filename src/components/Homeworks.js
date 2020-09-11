import React, { useState, useEffect } from "react";

function Homeworks({ userName, logIn, whichRole, whichClass }) {
  //console.log(whichRole);
  const [homeworkDescriptionSYes, sethomeworkDescriptionSYes] = useState(false);
  const [homeworkDescriptionSNo, sethomeworkDescriptionSNo] = useState(false);
  const [homeworkDescriptionALL, sethomeworkDescriptionALL] = useState(false);
  const [linkToMyHomework, setlinkToMyHomework] = useState("");
  const [linkToStudentHomework, setlinkToStudentHomework] = useState("");
  const [homeworkUnfinishedIdArray, sethomeworkUnfinishedIdArray] = useState(
    ""
  );
  const [homeworkUnfinishedId, sethomeworkUnfinishedId] = useState("");
  const [homeworkDescriptionALLR, sethomeworkDescriptionALLR] = useState(false); //reduced array
  const [openInputWindow, setopenInputWindow] = useState(false);
  const [homeworkStatus, sethomeworkStatus] = useState(false);
  const [homeworkStudentName, sethomeworkStudentName] = useState(false);
  useEffect(() => {
    getuserhomeworksStudentYes();
    getuserhomeworksStudentNo();
    getuserhomeworksALL();
    //getuserhomeworksInstructor();
  }, [logIn]);

  useEffect(() => {
    getuserhomeworksStudentNo();
    getuserhomeworksStudentYes();
    //getuserhomeworksInstructor();
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
        const arrToStatus = data.map(function (daten) {
          return daten.finished;
        });
        sethomeworkStatus(arrToStatus);
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

        const arrToStatus = data.map(function (daten) {
          return daten.finished;
        });
        sethomeworkStatus(arrToStatus);
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
            acc.push({ link: d.link, data: [value] }); // not found, so need to add data property
          } else {
            //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
            found.data.push(value); // if found, that means data property exists, so just push new element to found.data.
          }
          return acc;
        }, []);
        //console.log(data);
        sethomeworkDescriptionALLR(homeworkDescriptionALLR);
        //console.log(homeworkDescriptionALLR);
        const arrToDescription = data.map(function (daten) {
          return daten.link;
        });
        sethomeworkDescriptionALL(arrToDescription);
        const arrToStatus = data.map(function (daten) {
          return daten.finished;
        });
        sethomeworkStatus(arrToStatus);
        const arrToLinkStudentHomework = data.map(function (daten) {
          return daten.linkhwfinished;
        });
        setlinkToStudentHomework(arrToLinkStudentHomework);
        const arrToStudentName = data.map(function (daten) {
          return daten.name;
        });
        sethomeworkStudentName(arrToStudentName);
      });
  }

  ///////////////    CHANGE STATUS TO FINISHED        /////////////
  function changestatus(e) {
    setopenInputWindow(e);
    let homeworkId = homeworkUnfinishedIdArray[e];
    sethomeworkUnfinishedId(homeworkId);
    fetch("http://localhost:3001/homeworkfinished/".concat(homeworkId), {
      method: "PUT",
    });
  }
  ////////////////  SAVE LINK TO HOMEWORK FROM FORM  //////////////
  const saveLinkToHomework = (evt) => {
    evt.preventDefault();
    inputLinkToMyHomework(evt);
    setopenInputWindow(false);
  };
  const inputLinkToMyHomework = (evt) => {
    let homeworkId2 = homeworkUnfinishedId;
    const data = { link: linkToMyHomework };
    let data2 = JSON.stringify(data);
    //alert(data);
    let endlink = "http://localhost:3001/homeworkfinishedlink/".concat(
      homeworkId2
    );
    //console.log(endlink);
    fetch(endlink, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setlinkToMyHomework("");
  };
  ////////////////  PREPARE ARRAYS FOR GETTING DATA FROM DATABASE  //////////////
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
    homeworkDescriptionALLR === false
      ? (allHomeworks = [
          {
            link: "homework all",
            data: [{ name: "Ion", finished: "yes", linkhwfinished: "test" }],
          },
        ])
      : (allHomeworks = homeworkDescriptionALLR);
  }

  return (
    <div className="tabcontent">
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
                  <button
                    className="buttonHW"
                    key={index}
                    onClick={(e) => changestatus(index)}
                  >
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
            {allHomeworks.map((alldata, index) => {
              return (
                <div className="rowHW" key={"divRHW" + index}>
                  <div className="recordings" key={"divG" + index}>
                    <a className="linkToHomework" key={index}>
                      {alldata.link}
                    </a>
                  </div>
                  <div className="rowHWPosAbs" key={"divRHWStatus" + index}>
                    {alldata.data.map((data, index) => (
                      <a
                        target="_blank"
                        key={"butRHWStatus" + data.name + index}
                        href={data.linktohw}
                        className="buttonHWNamesA"
                        style={{
                          backgroundColor:
                            data.finished == "no" ? "red" : "green",
                        }}
                      >
                        {data.name}
                      </a>
                    ))}
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

//{link.data.map((data, index) => {
//  return (
//    <button
//      className="buttonHW1"
//      style={{
//        backgroundColor:
//          data.finished == "no" ? "red" : "green",
//      }}
//    >
//      {data.name}
//    </button>
//  );
//})}
