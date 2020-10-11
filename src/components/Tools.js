import React from "react";
import {
  slacklogo,
  trellologo,
  githublogo,
  herokulogo,
  videochat,
} from "./Impex";

export default function Tools() {
  function openRequestedPopup(link) {
    window.open(link, "_blank", "noopener, noreferrer");
  }
  return (
    <div>
      <div className="contLogoTools">
        <img
          className="logoTools"
          src={slacklogo}
          alt="slack"
          onClick={(e) =>
            openRequestedPopup(
              "https://app.slack.com/client/TMSJ4SYVD/CMDSP2CQ2"
            )
          }
        />
        <img
          className="logoTools"
          src={trellologo}
          alt="trello"
          onClick={(e) =>
            openRequestedPopup(
              "https://trello.com/b/1bHK3QmQ/students-overview"
            )
          }
        />

        <img
          className="logoTools"
          src={githublogo}
          alt="github"
          onClick={(e) => openRequestedPopup("https://github.com/")}
        />
        <img
          className="logoTools"
          src={herokulogo}
          alt="heroku"
          onClick={(e) =>
            openRequestedPopup("https://dashboard.heroku.com/apps")
          }
        />
        <img
          className="logoTools"
          src={videochat}
          alt="videochat"
          onClick={(e) =>
            openRequestedPopup("https://secvidchat.herokuapp.com/")
          }
        />
      </div>
    </div>
  );
}
//
