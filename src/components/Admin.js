import React, { useState } from "react";
import { API } from "./Impex.js";
import { useQuery, useMutation, queryCache } from "react-query";

function Admin() {
  let [newClass, setnewClass] = useState("");
  let [newUser, setnewUser] = useState("");
  let [newPwd, setnewPwd] = useState("");
  let [class4newuser, setclass4newuser] = useState("");
  let [openInputWindow, setopenInputWindow] = useState(false);
  let [openInputWindowUser, setopenInputWindowUser] = useState(false);
  /////////////////// GET DATA FROM DB WHERE USER ////////////////////

  const { isLoading, data, refetch } = useQuery("fetchAllData", () =>
    API.get(`alldata`)
  );

  //////////////  PREPARE DATA FOR WORK WITH IT ////////////////
  const dataAll =
    !isLoading &&
    data.data.reduce((acc, d) => {
      const found = acc.find((a) => a.class_name === d.class_name);
      const value = {
        name: d.name,
        role: d.user_role,
        password: d.user_password,
        class_id: d.class_id,
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
    saveanewClass();
    setnewUser("Instructor");
    savenewUser();
  }
  const [saveanewClass] = useMutation(
    () => API.post(`/setnewclass/${newClass}`),
    {
      onSuccess: () => {
        queryCache.invalidateQueries("fetchAllData");
        setopenInputWindow(false);
        setnewClass("");
        console.log("render...");
      },
    }
  );

  /////////    CREATE NEW USER AS ADMIN   ///////////
  async function savenewUser(evt) {
    evt && evt.preventDefault();

    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!.-_0123456789";
    let passwordLength = 6;
    const getRandomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const passwordCharacters = () => {
      let password = "";
      if (characters.length) {
        for (let i = 0; i < passwordLength; i++) {
          password += characters[getRandomInteger(0, characters.length - 1)];
        }
        characters = "";
        passwordLength = 0;
        return password;
      }
    };
    const pwd = passwordCharacters();
    setnewPwd(pwd);
    console.log(pwd);
    newStudent();
  }
  const [newStudent] = useMutation(
    () =>
      API.post(`/setnewuser/${newUser}`, {
        parol: newPwd,
        classID: class4newuser,
      }),
    {
      onSuccess: () => {
        setopenInputWindowUser(false);
        setnewPwd("");
        setnewUser("");
        setclass4newuser("");
        refetch();
      },
      onError: () => {
        alert("Please check the name, this name already exists");
      },
    }
  );
  const openWindowUser = (id) => {
    setclass4newuser(id);
    setopenInputWindowUser(true);
  };

  const openWindowClass = () => {
    setopenInputWindow(true);
  };
  return (
    <div className="flex-container">
      {isLoading ? (
        <div>C'mon database, wake up ...</div>
      ) : (
        dataAll.map((firstdata, index) => {
          return (
            <div className="flex-table" key={index}>
              <div
                className="table-container"
                role="table"
                aria-label="Classes"
                key={firstdata.class_name + index}
              >
                <div className="flex-header" role="rowgroup">
                  <div
                    className="flex-cell"
                    role="columnheader"
                    key={index + index + "0"}
                  >
                    {firstdata.class_name}
                  </div>
                  <div
                    className="flex-cell"
                    role="columnheader"
                    key={index + "buttonAddUser"}
                  >
                    {" "}
                    <button
                      className="buttonHW"
                      onClick={() => openWindowUser(firstdata.data[0].class_id)}
                    >
                      Add an user
                    </button>
                  </div>
                  <div
                    className="flex-cell"
                    role="columnheader"
                    key={index + "buttonAddClass"}
                  >
                    <button className="buttonHW" onClick={openWindowClass}>
                      Add a class
                    </button>
                  </div>
                </div>
                {firstdata.data.map((data, index) => (
                  <div className="flex-row" role="rowgroup" key={"rg" + index}>
                    <div
                      className="flex-cell"
                      role="cell"
                      key={data.name + index + "1"}
                    >
                      {data.name}
                    </div>
                    <div
                      className="flex-cell"
                      role="cell"
                      key={data.role + index + "2"}
                    >
                      {data.role}
                    </div>
                    <div
                      className="flex-cell"
                      role="cell"
                      key={"p" + index + "2"}
                    >
                      {data.password}
                    </div>
                  </div>
                ))}
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
            </div>
          );
        })
      )}
    </div> //menu
  );
}
export default React.memo(Admin);
