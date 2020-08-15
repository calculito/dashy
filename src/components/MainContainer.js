import React, { useState } from "react";
import Slack from "./Slack";
import Chat from "./Chat";
import Syllabus from "./Syllabus";
import Homeworks from "./Homeworks";
import Recordings from "./Recordings";
import Calendar from "./Calendar";
import Links from "./Links";

export default function MainContainer({ index }) {
  return (
    <div className="maincontainer">
      {
        {
          0: <Slack />,
          1: <Syllabus />,
          2: <Homeworks />,
          3: <Recordings />,
          4: <Calendar />,
          5: <Chat />,
          6: <Links />,
        }[index]
      }
    </div>
  );
}
