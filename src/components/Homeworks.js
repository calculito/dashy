import React, { useState, useEffect } from "react";

function Homeworks({ userName, logIn, whichRole, whichClass }) {
  //console.log(whichRole);
  const [homeworkInsertField, sethomeworkInsertField] = useState("");
  const [homeworkDescriptionSYes, sethomeworkDescriptionSYes] = useState([
    "homework finished",
  ]);
  const [homeworkDescriptionSNo, sethomeworkDescriptionSNo] = useState([
    "homework unfinished",
  ]);
  const [linkToMyHomework, setlinkToMyHomework] = useState("");
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
        sethomeworkDescriptionALLR(homeworkDescriptionALLR);
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
    let endlink = "http://localhost:3001/homeworkfinishedlink/".concat(
      homeworkId2
    );
    fetch(endlink, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setlinkToMyHomework("");
  };
  /////////    POST HOMEWORK AS INSTRUCTOR    ///////////
  function insertHomework() {
    const data = { link: homeworkInsertField };
    let endpoint = "http://localhost:3001/posthomework/".concat(whichClass);
    console.log(endpoint);
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    sethomeworkInsertField("");
  }
  ////////////////  PREPARE ARRAYS FOR GETTING DATA FROM DATABASE  //////////////
  let finishedHomeworks = homeworkDescriptionSYes;
  let unfinishedHomeworks = homeworkDescriptionSNo;
  let allHomeworks = homeworkDescriptionALLR;

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
                      className="linkToHomework"
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
          <div className="linksContainer">
            {unfinishedHomeworks.map((link, index) => {
              return (
                <div className="rowHW" key={"divRHWu" + index}>
                  <div className="recordings" key={"divP" + index}>
                    <a
                      className="linkToHomework"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
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
          <div className="linksContainer">
            {allHomeworks.map((alldata, index) => {
              return (
                <div className="rowHW" key={"divRHW" + index}>
                  <div className="recordings" key={"divG" + index}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkToHomework"
                      href={alldata.link}
                      key={index}
                    >
                      {alldata.link}
                    </a>
                  </div>
                  <div className="rowHWPosAbs" key={"divRHWStatus" + index}>
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
