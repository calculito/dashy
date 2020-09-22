import React, { useState, useEffect } from "react";

function Recordings({ userName, logIn, whichClass }) {
  const [recordingsTitle, setrecordingsTitle] = useState([
    "Recording of the class from 01.08.2020",
  ]);
  const [recordingsLink, setrecordingsLink] = useState(false);
  useEffect(() => {
    getuserRecordingsFromDB(userName);
  }, [userName, logIn, whichClass]);

  async function getuserRecordingsFromDB(userName) {
    let endpoint = "https://dashybackend.herokuapp.com/userrecordings/".concat(
      userName
    );
    await fetch(endpoint)
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
      });
  }
  let recordingLinks = recordingsTitle;

  return (
    <div className="tabcontent">
      <div className="infoWindow">
        You have {recordingsLink.length} recordings of your classes
      </div>

      <div className="linksContainer">
        {recordingLinks.map((data, i) => (
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
                KEYWORD
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Recordings;
