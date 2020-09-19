import React from "react";
import Iframe from "react-iframe";

function Book() {
  return (
    <div className="tabcontent95">
      <Iframe
        url="https://migracode-barcelona.github.io/syllabus/others/lesson0.html"
        width="99%"
        height="98%"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    </div>
  );
}
export default Book;
