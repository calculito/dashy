import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { sound } from "./Impex";

export default function ReadTextWindow() {
  const { speak } = useSpeechSynthesis();
  const [textToRead, settextToRead] = useState("");
  const [openInputWindow, setopenInputWindow] = useState(false);
  ///////////  SOUND READ LOUD  /////////////
  const soundloud = () => {
    speak({
      text: textToRead,
    });
    settextToRead("");
    setopenInputWindow(false);
  };
  return (
    <>
      <img
        className="linkSymbols"
        src={sound}
        alt="speaker"
        onClick={(e) => setopenInputWindow(1)}
      />
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
    </>
  );
}
