import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { sound } from "./Impex";

function Footer() {
  const { speak } = useSpeechSynthesis();
  const [openInputWindow, setopenInputWindow] = useState(false);
  const [textToRead, settextToRead] = useState("");
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
    "#967259",
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
export default React.memo(Footer);
