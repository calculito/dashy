import React, { useState } from "react";
import { useMutation, queryCache } from "react-query";
import { API } from "./Impex";

export default function NewRecording({ whichClass }) {
  const [newRecordingsLink, setnewRecordingsLink] = useState("");
  const [newRecordingsDescription, setnewRecordingsDescription] = useState("");
  const [newRecordingsKeyword, setnewRecordingsKeyword] = useState("");
  console.log("render...");
  /////////    POST RECORDING AS ADMIN    ///////////
  async function insertnewRecording(evt) {
    evt.preventDefault();
    mutateRecordings();
  }
  const [mutateRecordings] = useMutation(
    () =>
      API.post(`/postrecording/${whichClass}`, {
        link: newRecordingsLink,
        title: newRecordingsDescription,
        keyword: newRecordingsKeyword,
      }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries("recordings");
        setnewRecordingsLink("");
        setnewRecordingsKeyword("");
        setnewRecordingsDescription("");
      },
    }
  );

  return (
    <form
      className="cancelAndForgot"
      onSubmit={newRecordingsLink !== "" ? insertnewRecording : undefined}
    >
      <input
        className="inputLinks"
        type="text"
        placeholder="New recording link"
        value={newRecordingsLink}
        onChange={(e) => setnewRecordingsLink(e.target.value)}
        required
      />
      <input
        className="inputLinks"
        type="text"
        placeholder="Title"
        value={newRecordingsDescription}
        onChange={(e) => setnewRecordingsDescription(e.target.value)}
        required
      />
      <input
        className="inputLinks"
        type="text"
        placeholder="Keyword"
        style={{ width: "20%" }}
        value={newRecordingsKeyword}
        onChange={(e) => setnewRecordingsKeyword(e.target.value)}
        required
      />
      <button className="buttonHW" type="submit">
        ⇚ Insert a new recording
      </button>
    </form>
  );
}
