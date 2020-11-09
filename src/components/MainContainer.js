import React, { lazy } from "react";

function MainContainer({
  index,
  userName,
  logIn,
  whichClass,
  whichRole,
  whichUserId,
}) {
  const Homeworks = lazy(() => logIn > 0 && import("./Homeworks"));
  const Book = lazy(() => import("./Book"));
  const Recordings = lazy(() => logIn > 0 && import("./Recordings"));
  const Calendar = lazy(() => logIn > 0 && import("./Calendar"));
  const Links = lazy(() => logIn > 0 && import("./Links"));
  const Admin = lazy(() => logIn > 0 && import("./Admin"));
  //The React.lazy method makes it easy to code-split a React application on a component level using dynamic imports. Don't forget to import it from react too :)
  return (
    <div
      className="maincontainer"
      style={{
        height:
          logIn === 1
            ? window.innerWidth < 601
              ? "calc(100% - 141px)"
              : "calc(100% - 122px)"
            : "calc(100% - 95px)",
      }}
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
export default React.memo(MainContainer);
