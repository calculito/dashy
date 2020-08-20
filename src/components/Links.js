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
    <div id="links">
      <h3>You have {savedLink.length} links</h3>
      <input
        type="text"
        placeholder="Save your link"
        value={linkFromInput}
        onChange={handleInputChange}
      />
      {errorMessage ? <a>{errorMessage}</a> : null}
      <button onClick={createLink}>Save</button>
      {/* link examples, hardcode */}
      <h3>links saved by mentors</h3>
      <div className="links-mentors">
        <div>
          <ul>
            <li>
              <a href="#" target="_blank">
                https://github.com/Jose-cod7/tutorials/tree/sql-tutorial/sql
              </a>
            </li>
          </ul>
        </div>
      </div>

      <h3>links saved by students</h3>
      <div className="links-students">
        {/* link examples, hardcode */}
        <div>
          <ul>
            <li>
              <a href="#" target="_blank">
                https://www.postgresql.org/docs/12/datatype.html
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                https://reactjs.org/tutorial/tutorial.html
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
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
                  <a href={linkFromInput} target="_blank" key={index}>
                    {link}
                  </a>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Links;
