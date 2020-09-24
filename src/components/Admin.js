import React from "react";

export default function Admin({ userName, logIn, whichClass }) {
  return (
    <div>
      {" "}
      <form className="cancelAndForgot">
        <input
          className="inputLinks"
          type="text"
          placeholder="New recording"
          //value={linksInsertFieldG}
          //onChange={(e) => setlinksInsertFieldG(e.target.value)}
          required
        />

        <button
          className="buttonHW"
          // onClick={
          //   linksInsertFieldG !== "" ? insertGeneralLink : undefined
          //}
        >
          ⇚ Insert a new recording
        </button>
      </form>
      <form className="cancelAndForgot">
        <input
          className="inputLinks"
          type="text"
          placeholder="New appointment"
          //value={linksInsertFieldG}
          //onChange={(e) => setlinksInsertFieldG(e.target.value)}
          required
        />

        <button
          className="buttonHW"
          // onClick={
          //   linksInsertFieldG !== "" ? insertGeneralLink : undefined
          //}
        >
          ⇚ Insert a new appointment
        </button>
      </form>
    </div>
  );
}
