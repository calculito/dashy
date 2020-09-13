import React, { useState, useEffect } from "react";

function Footer() {
  const [colorSet, setcolorSet] = useState("gray");
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
        "rgba(213, 213, 202, 0.85)"
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
    /// COFFEE
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--background-page-color",
        "#ecede3"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--background-infow-color",
        "#d5d5ca"
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
        "#b0afa5"
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
        "darkgrey"
      );
    colorSet === "coffee" &&
      document.documentElement.style.setProperty("--font-white", "white");
    colorSet === "coffee" &&
      document.documentElement.style.setProperty(
        "--font-whitesmoke",
        "whitesmoke"
      );
  }, [colorSet]);

  return (
    <div className="iconsRefferer">
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
      <div>
        <button className="buttonHW" onClick={(e) => setcolorSet("blue")}>
          blau
        </button>
        <button className="buttonHW" onClick={(e) => setcolorSet("coffee")}>
          coffee
        </button>
        <button className="buttonHW" onClick={(e) => setcolorSet("gray")}>
          gray
        </button>
      </div>
    </div>
  );
}
export default Footer;