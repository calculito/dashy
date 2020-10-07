import React from "react";
import CalendarIcon from "../images/calendar.png";
import SyllabusIcon from "../images/syllabus.png";
import RecordingsIcon from "../images/recordings.png";
import HomeworksIcon from "../images/homeworks.png";
import ChatIcon from "../images/chat.png";
import SlackIcon from "../images/slacky.png";
import LinksIcon from "../images/links.png";
import AdminIcon from "../images/admin.png";

export default function Tabs({ onTabsClick, logIn, index, whichRole }) {
  return (
    <div className="menu">
      {logIn === 1 && (
        <>
          <div
            className={index === 0 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(0)}
          >
            <div className="circleIcons">
              <img className="icons" src={SyllabusIcon} alt="iconSyllabus" />
            </div>
            <div className="noblackfont">Syllabus </div>
          </div>

          <div
            className={index === 1 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(1)}
          >
            <div className="circleIcons">
              <img className="icons" src={SlackIcon} alt="iconSlack" />
            </div>
            <div className="noblackfont">Tools</div>
          </div>

          <div
            className={index === 2 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(2)}
          >
            <div className="circleIcons">
              <img className="icons" src={HomeworksIcon} alt="iconHomeworks" />
            </div>
            <div className="noblackfont">Homeworks</div>
          </div>

          <div
            className={index === 3 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(3)}
          >
            <div className="circleIcons">
              <img className="icons" src={LinksIcon} alt="iconLinks" />
            </div>
            <div className="noblackfont">Links</div>
          </div>

          <div
            className={index === 4 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(4)}
          >
            <div className="circleIcons">
              <img
                className="icons"
                src={RecordingsIcon}
                alt="iconRecordings"
              />
            </div>
            <div className="noblackfont">Recordings</div>
          </div>
          <div
            className={index === 5 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(5)}
          >
            <div className="circleIcons">
              <img className="icons" src={CalendarIcon} alt="iconCalendar" />
            </div>
            <div className="noblackfont">Calendar</div>
          </div>
          <div
            className={index === 6 ? "tabnameactive" : "tabname"}
            onClick={() => onTabsClick(6)}
          >
            <div className="circleIcons">
              <img className="icons" src={ChatIcon} alt="iconChat" />
            </div>
            <div className="noblackfont">one2one</div>
          </div>
          {whichRole === "Admin" && (
            <div
              className={index === 7 ? "tabnameactive" : "tabname"}
              onClick={() => onTabsClick(7)}
            >
              <div className="circleIcons">
                <img className="icons" src={AdminIcon} alt="iconAdmin" />
              </div>
              <div className="noblackfont">ADMIN</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
