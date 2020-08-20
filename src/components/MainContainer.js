import React from "react";
import Slack from "./Slack";
import Chat from "./Chat";
import Syllabus from "./Syllabus";
import Homeworks from "./Homeworks";
import Recordings from "./Recordings";
import Calendar from "./Calendar";
import Links from "./Links";

export default function MainContainer({ index, userName }) {
  console.log("main" + userName);
  return (
    <div className="maincontainer">
      {
        {
          0: <Syllabus />,
          1: <Slack />,
          2: <Homeworks />,
          3: <Recordings />,
          4: <Calendar />,
          5: <Chat />,
          6: <Links userName={userName} />,
        }[index]
      }
    </div>
  );
}
