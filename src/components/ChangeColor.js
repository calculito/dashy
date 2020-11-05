import React, { useState, useEffect } from "react";
import { ReadTextWindow } from "./Impex";

function ChangeColor() {
  const [colorSet, setcolorSet] = useState("blue");
  let varName = [
    "--background-page-color",
    "--background-tabA-color",
    "--background-tabN-color",
    "--font-dark-color",
    "--font-2light-color",
    "--webkit-filter",
    "--filter",
  ];
  let blue = [
    "#96c4d8",
    "#cbe3ee",
    "#548ba1",
    "#214753",
    "white",
    "invert(0)",
    "invert(0)",
  ];
  let coffee = [
    "#dbc1ac",
    "#ece0d1",
    "#a38068",
    "#66462F",
    "#ecede3",
    "invert(0)",
    "invert(0)",
  ];
  let gray = [
    "black",
    "#2e2e2e",
    "#5c5c5c",
    "rgb(199, 199, 199)",
    "rgb(25, 25, 25)",
    "invert(1)",
    "invert(1)",
  ];

  useEffect(() => {
    varName.map((data, index) => {
      colorSet === "blue" &&
        document.documentElement.style.setProperty(data, blue[index]);
      colorSet === "coffee" &&
        document.documentElement.style.setProperty(data, coffee[index]);
      colorSet === "gray" &&
        document.documentElement.style.setProperty(data, gray[index]);
    });
  }, [colorSet]);
  return (
    <div className="infoContButtons">
      <button className="buttonHW" style={{ height: "22px" }}>
        <ReadTextWindow />
      </button>
      <button
        className="buttonHW"
        style={{ height: "22px" }}
        onClick={(e) => setcolorSet("blue")}
      >
        blue
      </button>
      <button
        className="buttonHW"
        style={{ height: "22px" }}
        onClick={(e) => setcolorSet("coffee")}
      >
        coffee
      </button>
      <button
        className="buttonHW"
        style={{ height: "22px" }}
        onClick={(e) => setcolorSet("gray")}
      >
        gray
      </button>
    </div>
  );
}
export default React.memo(ChangeColor);
