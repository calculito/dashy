import React from "react";
import Slack from "./Slack";
import Chat from "./Chat";
import Syllabus from "./Syllabus";
import Homeworks from "./Homeworks";
import Recordings from "./Recordings";
import Calendar from "./Calendar";
import Links from "./Links";

export default function MainContainer({ index, userName }) {
  return (
    <div className="maincontainer">
      {
        {
          0: <Syllabus />,
          1: <Slack />,
          2: <Homeworks userName={userName} />,
          3: <Links userName={userName} />,
          4: <Recordings userName={userName} />,
          5: <Calendar userName={userName} />,
          6: <Chat />,
        }[index]
      }
    </div>
  );
}
