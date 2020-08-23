import React from "react";
import bg from "../images/Slack.png";

function Slack(i) {
  var windowObjectReference;
  var windowFeatures =
    "menubar=no,location=yes,resizable=no,scrollbars=no,status=no,width=1024px,height=728px,minWidth=600,minHeight=300,frame=false,titleBarStyle='hidden'";

  function openRequestedPopup() {
    windowObjectReference = window.open(
      "https://app.slack.com/client/TMSJ4SYVD/CMDSP2CQ2",
      "_blank",
      windowFeatures
    );
  }
  return (
    <div className="tabcontent">
      <img src={bg} alt="slack" onClick={openRequestedPopup} />
    </div>
  );
}
export default Slack;
