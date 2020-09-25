import React, { useState, useEffect, Suspense, Fragment } from "react";

export default function Recordings({ userName, logIn, whichClass, whichRole }) {
  const [switcher, setswitcher] = useState("0");
  const [recordingsTitle, setrecordingsTitle] = useState([
    "Recording of the class from 01.08.2020",
  ]);
  const [recordingsLink, setrecordingsLink] = useState(false);
  const [newRecordingsLink, setnewRecordingsLink] = useState("");
  const [newRecordingsDescription, setnewRecordingsDescription] = useState("");
  const [newRecordingsKeyword, setnewRecordingsKeyword] = useState("");
  const [recordingsKeyword, setrecordingsKeyword] = useState(false);
  useEffect(() => {
    logIn === 1 && getuserRecordingsFromDB();
  }, [userName, logIn, whichClass, switcher]);

  useEffect(() => {
    logIn === 1 && getit();
    setswitcher("");
  }, [whichClass, newRecordingsKeyword]);

  async function getit() {
    setswitcher(1);
  }
  async function getuserRecordingsFromDB() {
    await fetch(
      "https://dashybackend.herokuapp.com/userrecordings/".concat(userName)
    )
      .then((response) => response.json())
      .then((data) => {
        const arrToDescription = data.map(function (daten) {
          return daten.title;
        });
        setrecordingsTitle(arrToDescription);
        const arrToLink = data.map(function (daten) {
          return daten.link;
        });
        setrecordingsLink(arrToLink);
        const arrToKeyword = data.map(function (daten) {
          return daten.keyword;
        });
        setrecordingsKeyword(arrToKeyword);
      });
    setswitcher("1");
  }
  /////////    POST RECORDING AS ADMIN    ///////////
  async function insertnewRecording(evt) {
    evt.preventDefault();
    const data = {
      link: newRecordingsLink,
      title: newRecordingsDescription,
      keyword: newRecordingsKeyword,
    };
    let endpoint = "https://dashybackend.herokuapp.com/postrecording/".concat(
      whichClass
    );
    await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    setnewRecordingsLink("");
    setnewRecordingsKeyword("");
    setnewRecordingsDescription("");
    setswitcher("1");
  }
  return (
    <Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="tabcontent">
          <div className="infoWindow">
            You have {recordingsTitle.length} recordings of your classes
          </div>
          {whichRole === "Admin" ? (
            <form className="cancelAndForgot">
              <input
                className="inputLinks"
                type="text"
                placeholder="New recording link"
                value={newRecordingsLink}
                onChange={(e) => setnewRecordingsLink(e.target.value)}
                required
              />
              <input
                className="inputLinks"
                type="text"
                placeholder="Title"
                value={newRecordingsDescription}
                onChange={(e) => setnewRecordingsDescription(e.target.value)}
                required
              />
              <input
                className="inputLinks"
                type="text"
                placeholder="Keyword"
                style={{ width: "20%" }}
                value={newRecordingsKeyword}
                onChange={(e) => setnewRecordingsKeyword(e.target.value)}
                required
              />
              <button
                className="buttonHW"
                onClick={
                  newRecordingsLink !== "" ? insertnewRecording : undefined
                }
              >
                ⇚ Insert a new recording
              </button>
            </form>
          ) : undefined}
          <div className="linksContainer">
            {recordingsTitle.map((data, i) => (
              <div className="rowHW" key={"divRHW" + i}>
                <div className="recordings" key={"d" + i}>
                  <a
                    className="recordinglinks"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={recordingsLink[i]}
                    key={"b" + i}
                  >
                    {data}
                  </a>
                  <span
                    className="circle"
                    style={{
                      backgroundColor: "gray",
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    {recordingsKeyword[i]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Suspense>
    </Fragment>
  );
}
