import React from "react";
import {
  slacklogo,
  trellologo,
  githublogo,
  herokulogo,
  videochat,
} from "./Impex";

function Tools() {
  const logos = {
    0: slacklogo,
    1: trellologo,
    2: githublogo,
    3: herokulogo,
    4: videochat,
  };
  const links = [
    "https://app.slack.com/client/TMSJ4SYVD/CMDSP2CQ2",
    "https://trello.com/b/1bHK3QmQ/students-overview",
    "https://github.com/",
    "https://dashboard.heroku.com/apps",
    "https://secvidchat.herokuapp.com/",
  ];
  function openRequestedPopup(link) {
    window.open(link, "_blank", "noopener, noreferrer");
  }
  console.log("render...");
  return (
    <div>
      <div className="contLogoTools">
        {links.map((data, i) => (
          <img
            key={i}
            className="logoTools"
            src={logos[i]}
            alt="slack"
            onClick={(e) => openRequestedPopup(data)}
          />
        ))}
      </div>
    </div>
  );
}
export default React.memo(Tools);
