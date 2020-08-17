import React from "react";

export default function Tabs({ onTabsClick, logIn, index }) {
  console.log(index);
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
          </div>

          <div className={index === 1 ? "tabnameactive" : "tabname"}>
            <div onClick={() => onTabsClick(1)}>SLACK</div>
          </div>

          <div className={index === 2 ? "tabnameactive" : "tabname"}>
            <div onClick={() => onTabsClick(2)}>Homeworks</div>
          </div>

          <div className={index === 3 ? "tabnameactive" : "tabname"}>
            <div onClick={() => onTabsClick(3)}>Recordings</div>
          </div>
          <div className={index === 4 ? "tabnameactive" : "tabname"}>
            <div onClick={() => onTabsClick(4)}>Calendar</div>
          </div>
          <div className={index === 5 ? "tabnameactive" : "tabname"}>
            <div onClick={() => onTabsClick(5)}>CHAT one2one</div>
          </div>
          <div className={index === 6 ? "tabnameactive" : "tabname"}>
            <div onClick={() => onTabsClick(6)}>Personal links</div>
          </div>
        </>
      )}
    </div>
  );
}
