import React, { useState } from "react";

export default function Tabs({ onTabsClick, logIn, index }) {
  const [statusTab, setstatusTab] = useState("inactive");
  console.log(index);
  return (
    <div
      className="menu"
      style={{ justifyContent: logIn === 0 ? "flex-start" : "space-around" }}
    >
      <div
        className={index === 0 ? "tabnameactive" : "tabname"}
        onClick={() => onTabsClick(0)}
      >
        <div>SLACK</div>
      </div>
      <div className={index === 1 ? "tabnameactive" : "tabname"}>
        <div onClick={() => onTabsClick(1)}>Syllabus</div>
      </div>
      {logIn === 1 && (
        <>
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
