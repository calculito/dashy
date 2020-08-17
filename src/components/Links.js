import React from "react";

function Links(i) {
  return (
    <div className="tabcontent">
      <div className="contentLinks">
        <input type="text" id="fname" name="fname"></input>
        <label for="fname">Save link:</label>
        <ul>
          <li>https://dmitripavlutin.com/use-react-memo-wisely/</li>
          <li>
            https://docs.google.com/document/d/1iZcrGtYV7aoNCpZtKWRUCM2kGvmO2HfBM5btVhSG4yc/edit
          </li>
          <li>https://migrateam.github.io/dashy/</li>
        </ul>
      </div>
    </div>
  );
}
export default Links;
