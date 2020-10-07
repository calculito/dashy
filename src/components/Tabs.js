import React from "react";
import CalendarIcon from "../images/calendar.png";
import SyllabusIcon from "../images/syllabus.png";
import RecordingsIcon from "../images/recordings.png";
import HomeworksIcon from "../images/homeworks.png";
import ChatIcon from "../images/chat.png";
import ToolsIcon from "../images/slacky.png";
import LinksIcon from "../images/links.png";
import AdminIcon from "../images/admin.png";

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
