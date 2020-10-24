import React from "react";
import { ChangeColor } from "./Impex";

function Footer() {
  return (
    <div className="header" style={{ height: "30px" }}>
      <div className="iconsRefferer">
        <div className="invisibleMobile">
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/smashicons"
            title="Smashicons"
            target="_blank"
            rel="noopener noreferrer"
          >
            Smashicons
          </a>{" "}
          from{" "}
          <a
            href="https://www.flaticon.com/"
            title="Flaticon"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            www.flaticon.com
          </a>
        </div>
        <div className="invisibleMobile">
          made with love and sweat by Jose + Thiago + Ion 2020
        </div>
        <ChangeColor />
      </div>
    </div>
  );
}
export default React.memo(Footer);
