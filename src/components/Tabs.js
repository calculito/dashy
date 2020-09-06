import React from "react";
import CalendarIcon from "../images/calendar.png";
import SyllabusIcon from "../images/syllabus.png";
import RecordingsIcon from "../images/recordings.png";
import HomeworksIcon from "../images/homeworks.png";
import ChatIcon from "../images/chat.png";
import SlackIcon from "../images/slacky.png";
import LinksIcon from "../images/links.png";

export default function Tabs({ onTabsClick, logIn, index }) {
  function openRequestedPopup() {
    var windowObjectReference = window.open(
      "https://app.slack.com/client/TMSJ4SYVD/CMDSP2CQ2",
      "_blank"
    );
  }
  return (
    <div className="menu">
      {logIn === 1 && (
        <>
          <div
            className={index === 0 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(0)}
          >
            <div>Syllabus </div>
            <img className="icons" src={SyllabusIcon} alt="iconSyllabus" />
          </div>

          <div
            className={index === 1 ? "tabnameactive" : "tabname"}
            onClick={openRequestedPopup}
          >
            <div>SLACK</div>
            <img className="icons" src={SlackIcon} alt="iconSlack" />
          </div>

          <div
            className={index === 2 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(2)}
          >
            <div>Homeworks</div>
            <img className="icons" src={HomeworksIcon} alt="iconHomeworks" />
          </div>

          <div
            className={index === 3 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(3)}
          >
            <div>Useful links</div>
            <img className="icons" src={LinksIcon} alt="iconLinks" />
          </div>

          <div
            className={index === 4 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(4)}
          >
            <div>Recordings</div>
            <img className="icons" src={RecordingsIcon} alt="iconRecordings" />
          </div>
          <div
            className={index === 5 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(5)}
          >
            <div>Calendar</div>
            <img className="icons" src={CalendarIcon} alt="iconCalendar" />
          </div>
          <div
            className={index === 6 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(6)}
          >
            <div>CHAT one2one</div>
            <img className="icons" src={ChatIcon} alt="iconChat" />
          </div>
        </>
      )}
    </div>
  );
}
