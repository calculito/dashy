import React from "react";
import starblack from "../images/starblack.png";
import stargold from "../images/stargold.png";
function Stars(index, idlink) {
  let nummer = index.index;
  let linkid = idlink.idlink;

  ///////////////    CHANGE STARS PERSONAL LINKS       /////////////
  function changestars(e) {
    console.log(nummer + " .. " + e);
    console.log("nummer" + nummer + " .. " + linkid);
    // fetch("http://localhost:3001/personallinkstars/".concat(index), {
    //   method: "PUT",
    // });
  }

  return (
    <div>
      <img
        className="linkSymbols"
        src={nummer > 0 ? stargold : starblack}
        alt="star"
        onClick={(e) => changestars(1)}
      />
      <img
        className="linkSymbols"
        src={nummer > 1 ? stargold : starblack}
        alt="star"
        onClick={(e) => changestars(2)}
      />
      <img
        className="linkSymbols"
        src={nummer > 2 ? stargold : starblack}
        alt="star"
        onClick={(e) => changestars(3)}
      />
      <img
        className="linkSymbols"
        src={nummer > 3 ? stargold : starblack}
        alt="star"
        onClick={(e) => changestars(4)}
      />
      <img
        className="linkSymbols"
        src={nummer > 4 ? stargold : starblack}
        alt="star"
        onClick={(e) => changestars(5)}
      />
    </div>
  );
}
export default Stars;
