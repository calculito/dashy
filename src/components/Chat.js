import React from "react";

export default function Chat(i) {
  function openRequestedPopup() {
    window.open(
      "https://secvidchat.herokuapp.com/",
      "_blank",
      "noopener, noreferrer"
    );
  }
  return (
    <div className="tabcontent" onClick={openRequestedPopup}>
      <div className="contLinks">
        <div className="infoWindowChat">
          <ul>
            <li>Click here to open a new tab. </li>
            <li>Choose a room number and a password. </li>
            <li>
              Entry the chatroom and share the link you got with the other
              person.{" "}
            </li>
            <li>
              Once the other person accessed the room using the link and the
              password you sent, you can start chatting.{" "}
            </li>
            <li>Enjoy!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
