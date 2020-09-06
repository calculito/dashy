import React, { useState, useEffect } from "react";

function Recordings({ userName, logIn }) {
  const [recordingsTitle, setrecordingsTitle] = useState(false);
  const [recordingsLink, setrecordingsLink] = useState(false);
  useEffect(() => {
    getuserRecordingsFromDB(userName);
  }, [logIn]);

  function getuserRecordingsFromDB(userName) {
    let endpoint = "http://localhost:3001/userrecordings/".concat(userName);
    fetch(endpoint)
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
  let recordingLinks;
  {
    recordingsTitle === false
      ? (recordingLinks = ["Recording of the class from 01.08.2020"])
      : (recordingLinks = recordingsTitle);
  }

  return (
    <div className="tabcontent">
      <h4>Recordings of the classes</h4>
      <div className="linksContainer">
        {recordingLinks.map((data, i) => (
          <div className="rowHW" key={"divRHW" + i}>
            <div className="recordings" key={"d" + i}>
              <a target="_blank" href={recordingsLink[i]} key={"b" + i}>
                {data}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Recordings;
