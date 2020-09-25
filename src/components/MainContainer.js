import React from "react";
import Slack from "./Slack";
import Chat from "./Chat";
import Book from "./Book";
import Homeworks from "./Homeworks";
import Recordings from "./Recordings";
import Calendar from "./Calendar";
import Links from "./Links";
import Admin from "./Admin";

export default function MainContainer({
  index,
  userName,
  logIn,
  whichClass,
  whichRole,
  whichUserId,
}) {
  return (
    <div
      className="maincontainer"
      style={{ height: logIn === 0 ? "90%" : undefined }}
    >
      {
        {
          0: <Book />,
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
              whichRole={whichRole}
            />
          ),
          5: (
            <Calendar
              userName={userName}
              logIn={logIn}
              whichClass={whichClass}
              whichRole={whichRole}
            />
          ),
          6: <Chat />,
          7: <Admin />,
        }[index]
      }
    </div>
  );
}
