import React, { useState } from "react";

function Homeworks({ userName }) {
  const [finishedHomeworks, setfinishedHomeworks] = useState([
    "link1",
    "link2",
  ]);
  const [unfinishedHomeworks, setunfinishedHomeworks] = useState([
    "link3",
    "link4",
    "link6",
  ]);
  return (
    <div className="tabcontent">
      {" "}
      <div className="infoWindow">
        Hello {userName}, you have {finishedHomeworks.length} finished homeworks
        and {unfinishedHomeworks.length} unfinished homeworks
      </div>
      <h4>Finished homeworks</h4>
      <div className="linksContainer">
        {finishedHomeworks.map((link, index) => {
          return (
            <div className="recordings" key={"divG" + index}>
              <button href={link} target="blank" key={index}>
                {link}
              </button>
            </div>
          );
        })}
      </div>
      <h4>Unfinished homeworks</h4>
      <div className="linksContainer">
        {unfinishedHomeworks.map((link, index) => {
          return (
            <div className="recordings" key={"divP" + index}>
              <button href={link} target="blank" key={index}>
                {link}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Homeworks;
