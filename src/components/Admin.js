import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { API } from "./Impex.js";

export default function Admin({ logIn }) {
  let [newClass, setnewClass] = useState("");
  let [newUser, setnewUser] = useState("");
  let [openInputWindow, setopenInputWindow] = useState(false);
  let [openInputWindowUser, setopenInputWindowUser] = useState(false);
  /////////////////// GET DATA FROM DB WHERE USER ////////////////////
  useEffect(() => {
    refetch();
  });
  const {
    isLoading,
    error,
    data,
    isFetching,
    refetch,
  } = useQuery("fetchAllData", () => API.get(`alld`));
  //////////////  PREPARE DATA FOR WORK WITH IT ////////////////
  const dataAll =
    !isLoading &&
    data.data.reduce((acc, d) => {
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
  /////////    CREATE NEW CLASS AS ADMIN   ///////////
  async function savenewClass(evt) {
    evt.preventDefault();

    let endpoint = "https://dashybackend.herokuapp.com/setnewclass/".concat(
      newClass
    );
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    setopenInputWindow(false);
    setnewClass("");
  }
  /////////    CREATE NEW USER AS ADMIN   ///////////
  async function savenewUser(evt) {
    evt.preventDefault();

    let endpoint = "https://dashybackend.herokuapp.com/setnewuser/".concat(
      newUser
    );
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    setopenInputWindowUser(false);
    setnewUser("");
  }
  return (
    <div className="menu">
      {isLoading ? (
        <div>C'mon database, wake up ...</div>
      ) : (
        dataAll.map((firstdata, index) => {
          return (
            <div key={index}>
              <button
                className="buttonHW"
                onClick={(e) => setopenInputWindow(true)}
              >
                Add a class
              </button>
              <table id="customers" key={firstdata.class_name + index}>
                <thead>
                  <tr>
                    <th key={index + index + "0"}>{firstdata.class_name}</th>
                    <th key={index + "button"}>
                      {" "}
                      <button
                        className="buttonHW"
                        onClick={(e) => setopenInputWindowUser(true)}
                      >
                        Add an user
                      </button>
                    </th>
                  </tr>
                </thead>
                {firstdata.data.map((data, index) => (
                  <tbody key={index}>
                    <tr key={index}>
                      <td key={data.name + index + "1"}>{data.name}</td>
                      <td key={data.role + index + "2"}>{data.role}</td>
                    </tr>
                  </tbody>
                ))}
              </table>{" "}
              {openInputWindow !== false && (
                <div className="outPopUp">
                  <form className="form-container" onSubmit={savenewClass}>
                    <label>
                      Name of the new class:
                      <input
                        autoFocus
                        type="text"
                        placeholder="Enter the name of the new class"
                        value={newClass}
                        onChange={(e) => setnewClass(e.target.value)}
                      />
                    </label>
                    <input type="submit" value="Submit" className="btn" />
                  </form>
                </div>
              )}
              {openInputWindowUser !== false && (
                <div className="outPopUp">
                  <form className="form-container" onSubmit={savenewUser}>
                    <label>
                      Name of the new user:
                      <input
                        autoFocus
                        type="text"
                        placeholder="Enter the name of the new user"
                        value={newUser}
                        onChange={(e) => setnewUser(e.target.value)}
                      />
                    </label>
                    <input type="submit" value="Submit" className="btn" />
                  </form>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
