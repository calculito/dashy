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
      <h4>Recordings of the classes</h4>
      <div className="linksContainer">
        {recordingLinks.map((data, i) => (
          <div className="rowHW" key={"divRHW" + i}>
            <div className="recordings" key={"d" + i}>
              <button href={data} key={"b" + i}>
                {data}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Recordings;
