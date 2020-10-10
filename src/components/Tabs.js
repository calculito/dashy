import React from "react";
import {
  CalendarIcon,
  SyllabusIcon,
  RecordingsIcon,
  HomeworksIcon,
  ChatIcon,
  ToolsIcon,
  LinksIcon,
  AdminIcon,
} from "./Impex";

export default function Tabs({ onTabsClick, logIn, index, whichRole }) {
  const tabnames = [
    "Syllabus",
    "Tools",
    "Homeworks",
    "Links",
    "Recordings",
    "Calendar",
    "one2one",
    "Admin",
  ];
  const tabicons = {
    0: SyllabusIcon,
    1: ToolsIcon,
    2: HomeworksIcon,
    3: LinksIcon,
    4: RecordingsIcon,
    5: CalendarIcon,
    6: ChatIcon,
    7: AdminIcon,
  };
  return (
    <div className="menu">
      {logIn === 1 && (
        <>
          {tabnames.map((data, i) =>
            whichRole !== "Admin" && i === 7 ? undefined : (
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
