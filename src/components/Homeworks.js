import React, { useState } from "react";

function Homeworks({ userName }) {
  const [finishedHomeworks, setfinishedHomeworks] = useState([
    "https://github.com/CodeYourFuture/Databases-Homework/blob/master/week-2/mandatory/2-ecommerce-db/task.md",
    " https://github.com/jmbriano/tutorials/tree/sql-tutorial-solutions/sql",
  ]);
  const [unfinishedHomeworks, setunfinishedHomeworks] = useState([
    " https://www.w3schools.com/sql/default.asp",
    "Exercise 5 and title “homework” from https://migracode-barcelona.github.io/syllabus/db/week-1/lesson.html",
    "https://github.com/CodeYourFuture/Databases-Homework/blob/master/week-3/mandatory/2-api/task.md",
  ]);
  const finished = () => {
    alert("GOOD WORK");
  };
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
            <div className="rowHW" key={"divRHW" + index}>
              <div className="recordings" key={"divG" + index}>
                <button href={link} target="blank" key={index}>
                  {link}
                </button>
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
                <button href={link} target="blank" key={index}>
                  {link}
                </button>
              </div>
              <button className="buttonHW" onClick={finished}>
                Finished
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Homeworks;
