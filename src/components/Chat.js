import React from "react";
import Iframe from "react-iframe";

function Chat(i) {
  return (
    <div className="tabcontent">
      <Iframe
        url="https://secvidchat.herokuapp.com/"
        width="100%"
        height="650px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    </div>
  );
}
export default Chat;
