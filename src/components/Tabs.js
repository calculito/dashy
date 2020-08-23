import React from "react";
import CalendarIcon from "../images/calendar.png";
import SyllabusIcon from "../images/syllabus.png";
import RecordingsIcon from "../images/recordings.png";
import HomeworksIcon from "../images/homeworks.png";
import ChatIcon from "../images/chat.png";
import SlackIcon from "../images/slacky.png";
import LinksIcon from "../images/links.png";

export default function Tabs({ onTabsClick, logIn, index }) {
  var windowObjectReference;
  var windowFeatures =
    "menubar=no,location=yes,resizable=no,scrollbars=no,status=no,width=1024px,height=728px,minWidth=600,minHeight=300,frame=false,titleBarStyle='hidden'";

  function openRequestedPopup() {
    windowObjectReference = window.open(
      "https://app.slack.com/client/TMSJ4SYVD/CMDSP2CQ2",
      //"https://slack.com/intl/en-es/",
      "_blank",
      windowFeatures
    );
  }
  return (
    <div
      className="menu"
      style={{ justifyContent: logIn === 0 ? "flex-start" : "flex-start" }} //maybe change to space-around if bigger
    >
      {logIn === 1 && (
        <>
          <div
            className={index === 0 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(0)}
          >
            <div>Syllabus</div>
            <img
              className="icons"
              src={SyllabusIcon}
              alt="iconSyllabus"
              onClick={() => onTabsClick(0)}
            />
          </div>

          <div className={index === 1 ? "tabnameactive" : "tabname"}>
            <div onClick={openRequestedPopup}>SLACK</div>
            <img
              className="icons"
              src={SlackIcon}
              alt="iconSlack"
              onClick={() => onTabsClick(1)}
            />
          </div>

          <div className={index === 2 ? "tabnameactive" : "tabname"}>
            <div onClick={() => onTabsClick(2)}>Homeworks</div>
            <img
              className="icons"
              src={HomeworksIcon}
              alt="iconHomeworks"
              onClick={() => onTabsClick(2)}
            />
          </div>

          <div className={index === 3 ? "tabnameactive" : "tabname"}>
            <div onClick={() => onTabsClick(3)}>Recordings</div>
            <img
              className="icons"
              src={RecordingsIcon}
              alt="iconRecordings"
              onClick={() => onTabsClick(3)}
            />
          </div>
          <div className={index === 4 ? "tabnameactive" : "tabname"}>
            <div onClick={() => onTabsClick(4)}>Calendar</div>
            <img
              className="icons"
              src={CalendarIcon}
              alt="iconCalendar"
              onClick={() => onTabsClick(4)}
            />
          </div>
          <div className={index === 5 ? "tabnameactive" : "tabname"}>
            <div onClick={() => onTabsClick(5)}>CHAT one2one</div>
            <img
              className="icons"
              src={ChatIcon}
              alt="iconChat"
              onClick={() => onTabsClick(5)}
            />
          </div>
          <div className={index === 6 ? "tabnameactive" : "tabname"}>
            <div onClick={() => onTabsClick(6)}>Useful links</div>
            <img
              className="icons"
              src={LinksIcon}
              alt="iconLinks"
              onClick={() => onTabsClick(6)}
            />
          </div>
        </>
      )}
    </div>
  );
}
