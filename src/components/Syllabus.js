import React from "react";
import Iframe from "react-iframe";

function Syllabus() {
  return (
    <div className="tabcontent">
      <Iframe
        url="https://migracode-barcelona.github.io/syllabus/db/week-1/lesson.html"
        width="100%"
        height="550px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    </div>
  );
}
export default Syllabus;
