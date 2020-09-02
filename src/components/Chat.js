import React from "react";
import Iframe from "react-iframe";

function Chat(i) {
  var windowObjectReference;
  var windowFeatures =
    "menubar=no,location=yes,resizable=no,scrollbars=no,status=no,width=1024px,height=728px,minWidth=600,minHeight=300,frame=false,titleBarStyle='hidden'";

  function openRequestedPopup() {
    windowObjectReference = window.open(
      "https://secvidchat.herokuapp.com/",
      "_blank",
      windowFeatures
    );
  }
  return <div className="tabcontent" onClick={openRequestedPopup}></div>;
}
export default Chat;

//<Iframe
//url="https://secvidchat.herokuapp.com/"
//width="100%"
//height="650px"
//id="myId"
//className="myClassname"
//display="initial"
//position="relative"
///>
