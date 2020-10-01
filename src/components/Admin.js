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
  }, [logIn, switcher]);

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
          const found = acc.find((a) => a.class_name === d.class_name);
          const value = {
            name: d.name,
            role: d.user_role,
          };
          if (!found) {
            acc.push({
              class_name: d.class_name,
              data: [value],
            });
          } else {
            found.data.push(value);
            // found.data.push(d.id);
          }
          return acc;
        }, []);
        setdataAll(allClassData);
        //console.log(dataAll);
        setswitcher(1);
      });
  }

  return (
    <div className="menu">
      {dataAll.map((firstdata, index) => {
        return (
          <div key={index}>
            <table id="customers" key={firstdata.class_name}>
              <thead>
                <tr>
                  <th key={index}>{firstdata.class_name}</th>
                </tr>
              </thead>
              {firstdata.data.map((data, index) => (
                <tbody key={index}>
                  <tr key={index}>
                    <td key={data.name}>{data.name}</td>
                    <td key={data.role}>{data.role}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        );
      })}
    </div>
  );
}
