import React from "react";
import Iframe from "react-iframe";

function Slack(i) {
  return (
    <div className="tabcontent">
      <Iframe
        url="http://migracodebarcelona.slack.com"
        width="100%"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    </div>
  );
}
export default Slack;
