import React, { useState } from "react";

function Recordings({ userName }) {
  const recordingLinks = [
    "Recording of the class from 01.08.2020",
    "Recording of the class from 04.08.2020",
    "Recording of the class from 08.08.2020",
    "Recording of the class from 11.08.2020",
  ];
  return (
    <div className="tabcontent">
      <div className="infoWindow">
        Hello {userName}, you have {recordingLinks.length} recordings
      </div>
      <h4>Recordings of the classes</h4>
      {recordingLinks.map((data, i) => (
        <div className="recordings" key={"d" + i}>
          <li key={"li" + i}>
            <button href={data} key={"b" + i}>
              {data}
            </button>
          </li>
        </div>
      ))}
    </div>
  );
}
export default Recordings;
