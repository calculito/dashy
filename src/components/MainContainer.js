import React from "react";
import Slack from "./Slack";
import Chat from "./Chat";
import Syllabus from "./Syllabus";
import Homeworks from "./Homeworks";
import Recordings from "./Recordings";
import Calendar from "./Calendar";
import Links from "./Links";

export default function MainContainer({
  index,
  userName,
  logIn,
  whichClass,
  whichRole,
  whichUserId,
}) {
  //console.log(user);
  return (
    <div className="maincontainer">
      {
        {
          0: <Syllabus />,
          1: <Slack />,
          2: (
            <Homeworks
              userName={userName}
              logIn={logIn}
              whichRole={whichRole}
              whichClass={whichClass}
              whichUserId={whichUserId}
            />
          ),
          3: (
            <Links
              userName={userName}
              logIn={logIn}
              whichClass={whichClass}
              whichRole={whichRole}
              whichUserId={whichUserId}
            />
          ),
          4: (
            <Recordings
              userName={userName}
              logIn={logIn}
              whichClass={whichClass}
            />
          ),
          5: (
            <Calendar
              userName={userName}
              logIn={logIn}
              whichClass={whichClass}
            />
          ),
          6: <Chat />,
        }[index]
      }
    </div>
  );
}
