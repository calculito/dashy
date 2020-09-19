import React from "react";
import hammerwhite from "../images/hammerwhite.png";
import hammercolor from "../images/hammercolor.png";
function Hammers(index) {
  let nummer = index.index;
  //console.log("nummer" + nummer);
  function showhammers(e) {
    alert("Do you want to change the hammers?");
  }
  return (
    <div className="hammercontainer">
      <img
        className="linkSymbols"
        src={nummer > 0 ? hammercolor : hammerwhite}
        alt="hammer"
        onClick={(e) => showhammers(e)}
      />
      <img
        className="linkSymbols"
        src={nummer > 1 ? hammercolor : hammerwhite}
        alt="hammer"
        onClick={(e) => showhammers(e)}
      />
      <img
        className="linkSymbols"
        src={nummer > 2 ? hammercolor : hammerwhite}
        alt="hammer"
        onClick={(e) => showhammers(e)}
      />
      <img
        className="linkSymbols"
        src={nummer > 3 ? hammercolor : hammerwhite}
        alt="hammer"
        onClick={(e) => showhammers(e)}
      />
      <img
        className="linkSymbols"
        src={nummer > 4 ? hammercolor : hammerwhite}
        alt="hammer"
        onClick={(e) => showhammers(e)}
      />
    </div>
  );
}
export default Hammers;
