import React, { useState } from "react";

function Links({ userName }) {
  console.log("username" + userName); //name of the current user passed from app.js

  const [savedLink, setLinkSaved] = useState([]);
  const [linkFromInput, setLinkFromInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputChange = (event) => {
    setLinkFromInput(event.target.value);
  };
  const createLink = () => {
    if (linkFromInput !== "") {
      setErrorMessage("");
      setLinkSaved(savedLink.concat(linkFromInput));
    } else {
      setErrorMessage("Please enter a link");
    }
  };

  return (
    <div className="tabcontent">
      <div id="links">
        <h4>You have {savedLink.length} links</h4>
        <input
          type="text"
          placeholder="Save your link"
          value={linkFromInput}
          onChange={handleInputChange}
        />
        {errorMessage ? (
          <a href="https://migrateam.github.io/dashy/">{errorMessage}</a>
        ) : null}
        <button onClick={createLink}>Save</button>
        {/* link examples, hardcode */}
        <h4>links saved by mentors</h4>
        <div className="links-mentors">
          <div>
            <ul>
              <li>
                <a
                  href="https://github.com/Jose-cod7/tutorials/tree/sql-tutorial/sql"
                  target="blank"
                >
                  https://github.com/Jose-cod7/tutorials/tree/sql-tutorial/sql
                </a>
              </li>
            </ul>
          </div>
        </div>

        <h4>links saved by students</h4>
        <div className="links-students">
          {/* link examples, hardcode */}
          <div>
            <ul>
              <li>
                <a
                  href="https://www.postgresql.org/docs/12/datatype.html"
                  target="blank"
                >
                  https://www.postgresql.org/docs/12/datatype.html
                </a>
              </li>
              <li>
                <a
                  href="https://reactjs.org/tutorial/tutorial.html"
                  target="blank"
                >
                  https://reactjs.org/tutorial/tutorial.html
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Jose-cod7/tutorials/tree/sql-tutorial/sql"
                  target="blank"
                >
                  https://github.com/Jose-cod7/tutorials/tree/sql-tutorial/sql
                </a>
              </li>
            </ul>
          </div>
          {savedLink.map((link, index) => {
            return (
              <div>
                <ul>
                  <li>
                    <a href={linkFromInput} target="blank" key={index}>
                      {link}
                    </a>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Links;
