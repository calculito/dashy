import React from "react";
import {
  Tools,
  Chat,
  Book,
  Homeworks,
  Recordings,
  Calendar,
  Links,
  Admin,
} from "./Impex";

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
          1: <Tools />,
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
