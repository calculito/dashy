import React from "react";
import Slack from "./Slack";
import Chat from "./Chat";
import Syllabus from "./Syllabus";
import Homeworks from "./Homeworks";
import Recordings from "./Recordings";
import Calendar from "./Calendar";
import Links from "./Links";

export default function MainContainer({ index, userName, user }) {
  //console.log(user);
  return (
    <div className="maincontainer">
      {
        {
          0: <Syllabus />,
          1: <Slack />,
          2: <Homeworks userName={userName} user={user} />,
          3: <Links userName={userName} user={user} />,
          4: <Recordings userName={userName} user={user} />,
          5: <Calendar userName={userName} user={user} />,
          6: <Chat />,
        }[index]
      }
    </div>
  );
}
