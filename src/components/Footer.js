import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { sound } from "./Impex";

export default function Footer() {
  const { speak } = useSpeechSynthesis();
  const [openInputWindow, setopenInputWindow] = useState(false);
  const [textToRead, settextToRead] = useState("");
  const [colorSet, setcolorSet] = useState("blue");
  let varName = [
    "--background-page-color",
    "--background-infow-color",
    "--shade-infow-color",
    "--shade-light-color",
    "--shade-dark-color",
    "--background-tabn-color",
    "--font-infow-color",
    "--font-tabnI-color",
    "--font-light-color",
    "--font-white",
    "--font-whitesmoke",
    "--webkit-filter",
    "--filter",
  ];
  let blue = [
    "#cbe3ee",
    "#96c4d8",
    "#548ba1",
    "rgba(255, 255, 255, 1)",
    "rgba(33, 71, 83, 0.3)",
    "#e0eef7",
    "#214753",
    "#286b7b",
    "#548ba1",
    "white",
    "cbe3ee",
    "invert(0)",
    "invert(0)",
  ];
  let coffee = [
    "#d5d5ca",
    "#b0afa5",
    "rgba(213, 213, 202, 0.85)",
    "rgba(255, 255, 255, 1)",
    "rgba(0, 0, 0, 0.3)",
    "#ecede3",
    "darkslategray",
    "#352f31",
    "#ecede3",
    "#ecede3",
    "#d5d5ca",
    "invert(0)",
    "invert(0)",
  ];
  let gray = [
    "#161616",
    "#4b4b4b",
    "rgba(51, 51, 51, 0.85)",
    "rgba(255, 255, 255, 0.3)",
    "rgb(0, 0, 0)",
    "#6e6e6e",
    "rgb(199, 199, 199)",
    "#d6d6d6",
    "rgb(121, 121, 121)",
    "gb(0, 0, 0)",
    "rgb(70, 70, 70)",
    "invert(1)",
    "invert(1)",
  ];

  function changeColor() {
    varName.map((data, index) => {
      colorSet === "blue" &&
        document.documentElement.style.setProperty(data, blue[index]);
      colorSet === "coffee" &&
        document.documentElement.style.setProperty(data, coffee[index]);
      colorSet === "gray" &&
        document.documentElement.style.setProperty(data, gray[index]);
    });
  }

  useEffect(() => {
    changeColor();
  }, [colorSet]);
  ///////////  SOUND READ LOUD  /////////////
  function soundloud() {
    speak({
      text: textToRead,
    });
    setopenInputWindow(false);
    settextToRead("");
  }
  return (
    <div className="header" style={{ height: "30px" }}>
      <div className="iconsRefferer">
        {openInputWindow !== false && (
          <div className="outPopUpText">
            <form className="form-container" onSubmit={soundloud}>
              <label>
                Insert your text:
                <textarea
                  className="bigWindowForText"
                  autoFocus
                  type="text"
                  placeholder="xyz..."
                  value={textToRead}
                  onChange={(e) => settextToRead(e.target.value)}
                />
              </label>
              <input type="submit" value="Submit" className="buttonHW" />
            </form>
          </div>
        )}
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
        <div className="infoContButtons">
          <button
            className="buttonHW"
            style={{ height: "22px" }}
            onClick={(e) => setcolorSet("blue")}
          >
            <img
              className="linkSymbols"
              src={sound}
              alt="speaker"
              onClick={(e) => setopenInputWindow(1)}
            />
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
      </div>
    </div>
  );
}
