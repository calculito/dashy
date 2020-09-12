import React from "react";
import starblack from "../images/starblack.png";
import stargold from "../images/stargold.png";
function Stars(index) {
  let nummer = index;
  function showstars(e) {
    alert("Do you want to change the stars?");
  }
  return (
    <div>
      <img
        className="linkSymbols"
        src={nummer > 0 ? stargold : starblack}
        alt="star"
        onClick={(e) => showstars(e)}
      />
      <img
        className="linkSymbols"
        src={nummer > 1 ? stargold : starblack}
        alt="star"
        onClick={(e) => showstars(e)}
      />
      <img
        className="linkSymbols"
        src={nummer > 2 ? stargold : starblack}
        alt="star"
        onClick={(e) => showstars(e)}
      />
      <img
        className="linkSymbols"
        src={nummer > 3 ? stargold : starblack}
        alt="star"
        onClick={(e) => showstars(e)}
      />
      <img
        className="linkSymbols"
        src={nummer > 4 ? stargold : starblack}
        alt="star"
        onClick={(e) => showstars(e)}
      />
    </div>
  );
}
export default Stars;
