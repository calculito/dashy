import React from "react";
import {
  CalendarIcon,
  SyllabusIcon,
  RecordingsIcon,
  HomeworksIcon,
  LinksIcon,
  AdminIcon,
} from "./Impex";

export default function Tabs({ onTabsClick, logIn, index, whichRole }) {
  const tabnames = [
    "Syllabus",
    "Homeworks",
    "Links",
    "Recordings",
    "Calendar",
    "Admin",
  ];
  const tabicons = {
    0: SyllabusIcon,
    1: HomeworksIcon,
    2: LinksIcon,
    3: RecordingsIcon,
    4: CalendarIcon,
    5: AdminIcon,
  };
  return (
    <div className="menu">
      {logIn === 1 && (
        <>
          {tabnames.map((data, i) =>
            whichRole !== "Admin" && i === 5 ? undefined : (
              <div
                className={index === i ? "tabnameactive" : "tabname"}
                onClick={() => onTabsClick(i)}
                key={"tabcontainer" + i}
              >
                <div className="circleIcons" key={"icon" + i}>
                  <img
                    className="icons"
                    key={tabicons[i]}
                    src={tabicons[i]}
                    alt={tabicons[i]}
                  />
                </div>
                <div className="noblackfont" key={"text" + i}>
                  {data}
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
