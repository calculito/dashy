import React, { useState, useEffect, Suspense, Fragment } from "react";

export default function Recordings({ userName, logIn, whichClass }) {
  const [switcher, setswitcher] = useState("0");
  const [recordingsTitle, setrecordingsTitle] = useState([
    "Recording of the class from 01.08.2020",
  ]);
  const [recordingsLink, setrecordingsLink] = useState(false);
  const [recordingsKeyword, setrecordingsKeyword] = useState(false);
  useEffect(() => {
    logIn === 1 && getuserRecordingsFromDB();
  }, [userName, logIn, whichClass, switcher]);

  useEffect(() => {
    logIn === 1 && getit();
    setswitcher("");
  }, [whichClass]);

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

  return (
    <Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="tabcontent">
          <div className="infoWindow">
            You have {recordingsTitle.length} recordings of your classes
          </div>

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
