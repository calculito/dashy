import React from "react";
import { Book, Homeworks, Recordings, Calendar, Links, Admin } from "./Impex";

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
      style={{ height: logIn === 0 ? "calc(100% - 102px)" : undefined }}
    >
      {
        {
          0: <Book />,
          1: (
            <Homeworks
              userName={userName}
              logIn={logIn}
              whichRole={whichRole}
              whichClass={whichClass}
              whichUserId={whichUserId}
            />
          ),
          2: (
            <Links
              userName={userName}
              logIn={logIn}
              whichClass={whichClass}
              whichRole={whichRole}
              whichUserId={whichUserId}
            />
          ),
          3: (
            <Recordings
              userName={userName}
              logIn={logIn}
              whichClass={whichClass}
              whichRole={whichRole}
            />
          ),
          4: (
            <Calendar
              userName={userName}
              logIn={logIn}
              whichClass={whichClass}
              whichRole={whichRole}
            />
          ),
          5: <Admin />,
        }[index]
      }
    </div>
  );
}
