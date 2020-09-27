import React from "react";
import slacklogo from "../images/slacklogo.png";
import trellologo from "../images/trellologo.png";
import githublogo from "../images/githublogo.jpg";
import herokulogo from "../images/herokulogo.png";

export default function Slack() {
  function openRequestedPopup(link) {
    window.open(link, "_blank", "noopener, noreferrer");
  }
  return (
    <div className="tabcontent">
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
      </div>
      <div className="contLogoTools">
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
      </div>
    </div>
  );
}
//
