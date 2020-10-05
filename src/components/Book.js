import React from "react";
import bookhtml from "../images/bookhtml.png";
import bookjavascript1 from "../images/bookjavascript1.png";
import bookjavascript2 from "../images/bookjavascript2.png";
import bookjavascript3 from "../images/bookjavascript3.png";
import bookreact from "../images/bookreact.png";
import booknode from "../images/booknode.png";
import bookall from "../images/bookall.png";
import addbook from "../images/addbook.png";
export default function Book() {
  function openRequestedPopup(link) {
    window.open(link, "_blank", "noopener, noreferrer");
  }
  return (
    <div className="tabcontent">
      <div className="contLogoBooks">
        <div>
          <img
            className="logoBooks"
            src={bookhtml}
            alt="slack"
            onClick={(e) =>
              openRequestedPopup(
                "https://migracode-barcelona.github.io/syllabus/html-css/"
              )
            }
          />
          <img
            className="logoBooks"
            src={bookjavascript1}
            alt="js1"
            onClick={(e) =>
              openRequestedPopup(
                "https://migracode-barcelona.github.io/syllabus/js-core/"
              )
            }
          />
        </div>
        <div>
          <img
            className="logoBooks"
            src={bookjavascript2}
            alt="js2"
            onClick={(e) =>
              openRequestedPopup(
                "https://migracode-barcelona.github.io/syllabus/js-core-2/"
              )
            }
          />
          <img
            className="logoBooks"
            src={bookjavascript3}
            alt="js3"
            onClick={(e) =>
              openRequestedPopup(
                "https://migracode-barcelona.github.io/syllabus/js-core-3/"
              )
            }
          />
        </div>
      </div>
      <div className="contLogoBooks">
        <div>
          <img
            className="logoBooks"
            src={bookreact}
            alt="bookreact"
            onClick={(e) =>
              openRequestedPopup(
                "https://migracode-barcelona.github.io/syllabus/react/"
              )
            }
          />
          <img
            className="logoBooks"
            src={booknode}
            alt="node"
            onClick={(e) =>
              openRequestedPopup(
                "https://migracode-barcelona.github.io/syllabus/node/"
              )
            }
          />
        </div>
        <div>
          <img
            className="logoBooks"
            src={bookall}
            alt="bookall"
            onClick={(e) =>
              openRequestedPopup(
                "https://migracode-barcelona.github.io/syllabus/"
              )
            }
          />
          <img
            className="logoBooks"
            src={addbook}
            alt="add book"
            onClick={(e) =>
              openRequestedPopup(
                "https://migracode-barcelona.github.io/syllabus/"
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
