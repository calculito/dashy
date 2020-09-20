import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import sound from "../images/sound.png";
function Footer() {
  const { speak } = useSpeechSynthesis();
  const [openInputWindow, setopenInputWindow] = useState(false);
  const [textToRead, settextToRead] = useState("");
  const [colorSet, setcolorSet] = useState("white");
  useEffect(() => {
    console.log(colorSet);
    /// BLAU
    colorSet === "blue" &&
      document.documentElement.style.setProperty(
        "--background-page-color",
        "#cbe3ee"
      );
    colorSet === "blue" &&
      document.documentElement.style.setProperty(
        "--background-infow-color",
        "#96c4d8"
      );
    colorSet === "blue" &&
      document.documentElement.style.setProperty(
        "--shade-infow-color",
        "#548ba1"
      );
    colorSet === "blue" &&
      document.documentElement.style.setProperty(
        "--shade-light-color",
        "rgba(255, 255, 255, 1)"
      );
    colorSet === "blue" &&
      document.documentElement.style.setProperty(
        "--shade-dark-color",
        "rgba(33, 71, 83, 0.3)"
      );
    colorSet === "blue" &&
      document.documentElement.style.setProperty(
        "--background-tabn-color",
        "#e0eef7"
      );
    colorSet === "blue" &&
      document.documentElement.style.setProperty(
        "--font-infow-color",
        "#214753"
      );
    colorSet === "blue" &&
      document.documentElement.style.setProperty(
        "--font-tabnI-color",
        "#286b7b"
      );
    colorSet === "blue" &&
      document.documentElement.style.setProperty(
        "--font-light-color",
        "#548ba1"
      );
    colorSet === "blue" &&
      document.documentElement.style.setProperty("--font-white", "white");
    colorSet === "blue" &&
      document.documentElement.style.setProperty("--font-whitesmoke", "cbe3ee");
    colorSet === "blue" &&
      document.documentElement.style.setProperty(
        "--webkit-filter",
        "invert(0)"
      );
    colorSet === "blue" &&
      document.documentElement.style.setProperty("--filter", "invert(0)");
    /// COFFEE
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--background-page-color",
        "#d5d5ca"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--background-infow-color",
        "#b0afa5"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--shade-infow-color",
        "rgba(213, 213, 202, 0.85)"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--shade-light-color",
        "rgba(255, 255, 255, 1)"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--shade-dark-color",
        "rgba(0, 0, 0, 0.3)"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--background-tabn-color",
        "#ecede3"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--font-infow-color",
        "darkslategray"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--font-tabnI-color",
        "#352f31"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--font-light-color",
        "#ecede3"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty("--font-white", "#ecede3");
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--font-whitesmoke",
        "#d5d5ca"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--webkit-filter",
        "invert(0)"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty("--filter", "invert(0)");
    /// BLACK
    colorSet === "gray" &&
      document.documentElement.style.setProperty(
        "--background-page-color",
        "#161616"
      );
    colorSet === "gray" &&
      document.documentElement.style.setProperty(
        "--background-infow-color",
        "#4b4b4b"
      );
    colorSet === "gray" &&
      document.documentElement.style.setProperty(
        "--shade-infow-color",
        "rgba(51, 51, 51, 0.85)"
      );
    colorSet === "gray" &&
      document.documentElement.style.setProperty(
        "--shade-light-color",
        "rgba(255, 255, 255, 0.3)"
      );
    colorSet === "gray" &&
      document.documentElement.style.setProperty(
        "--shade-dark-color",
        "rgb(0, 0, 0)"
      );
    colorSet === "gray" &&
      document.documentElement.style.setProperty(
        "--background-tabn-color",
        "#6e6e6e"
      );
    colorSet === "gray" &&
      document.documentElement.style.setProperty(
        "--font-infow-color",
        "rgb(199, 199, 199)"
      );
    colorSet === "gray" &&
      document.documentElement.style.setProperty(
        "--font-tabnI-color",
        "#d6d6d6"
      );
    colorSet === "gray" &&
      document.documentElement.style.setProperty(
        "--font-light-color",
        "rgb(121, 121, 121)"
      );
    colorSet === "gray" &&
      document.documentElement.style.setProperty("--font-white", "gb(0, 0, 0)");
    colorSet === "gray" &&
      document.documentElement.style.setProperty(
        "--font-whitesmoke",
        "rgb(70, 70, 70)"
      );
    colorSet === "gray" &&
      document.documentElement.style.setProperty(
        "--webkit-filter",
        "invert(1)"
      );
    colorSet === "gray" &&
      document.documentElement.style.setProperty("--filter", "invert(1)");
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
      <div>
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
      <div className="infoContLinks">
        <button className="buttonHW" onClick={(e) => setcolorSet("blue")}>
          blau
        </button>
        <button className="buttonHW" onClick={(e) => setcolorSet("coffee")}>
          coffee
        </button>
        <button className="buttonHW" onClick={(e) => setcolorSet("gray")}>
          gray
        </button>
        <img
          className="linkSymbols"
          src={sound}
          alt="speaker"
          onClick={(e) => setopenInputWindow(1)}
        />
      </div>
    </div>
  );
}
export default Footer;
