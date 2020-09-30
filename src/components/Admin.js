import React, { useState, useEffect } from "react";

export default function Admin({ logIn }) {
  let [switcher, setswitcher] = useState("0");
  let [dataAll, setdataAll] = useState([
    {
      class_id: 1,
      data: [{ user_name: "Ion", user_role: "Student" }],
    },
  ]);

  useEffect(() => {
    getClass();
  }, [logIn, switcher, getit]);

  useEffect(() => {
    getit();
    setswitcher("");
  }, [dataAll, getClass]);

  async function getit() {
    await setswitcher(1);
  }
  /////////////////// GET DATA FROM DB WHERE USER ////////////////////
  async function getClass() {
    await fetch("https://dashybackend.herokuapp.com/alld")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const allClassData = data.reduce((acc, d) => {
          const found = acc.find((a) => a.class_id === d.class_id);
          const value = {
            name: d.name,
            role: d.user_role,
          };
          if (!found) {
            acc.push({
              class_id: d.class_id,
              data: [value],
            });
          } else {
            found.data.push(value);
            // found.data.push(d.id);
          }
          return acc;
        }, []);
        setdataAll(allClassData);
        console.log(dataAll);
        setswitcher(1);
      });
  }

  return (
    <div className="menu">
      {dataAll.map((firstdata, index) => {
        return (
          <div>
            <ul key={index}>
              {firstdata.class_id}
              <li key={index}>
                {firstdata.data.map((data, index) => (
                  <div className="HomeworkCheck">
                    <button
                      key={"butRHWStatus" + data.user_name + index}
                      className="buttonHWNamesA"
                      style={{
                        backgroundColor:
                          data.user_role === "Student"
                            ? data.user_role === "Instructor"
                              ? "green"
                              : data.user_role === "Admin"
                              ? "red"
                              : "darkorange"
                            : "white",
                      }}
                    >
                      {data.name}
                      {data.role}
                    </button>
                  </div>
                ))}
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
