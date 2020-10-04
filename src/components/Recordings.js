import React, { useState, useEffect, Suspense, Fragment } from "react";
import { useQuery, useMutation, queryCache } from "react-query";
import API from "../Api.js";
import { resolveProjectReferencePath } from "typescript";
export default function Recordings({ userName, logIn, whichClass, whichRole }) {
  const [newRecordingsLink, setnewRecordingsLink] = useState("");
  const [newRecordingsDescription, setnewRecordingsDescription] = useState("");
  const [newRecordingsKeyword, setnewRecordingsKeyword] = useState("");

  //////////////  GET RECORDINGS /////////////
  const {
    isLoading,
    error,
    data,
    isFetching,
    refetch,
  } = useQuery("fetchRecordings", () => API.get(`userrecordings/${userName}`));
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
        queryCache.invalidateQueries("fetchRecordings");
        setnewRecordingsLink("");
        setnewRecordingsKeyword("");
        setnewRecordingsDescription("");
      },
    }
  );
  useEffect(() => {
    refetch();
    console.log(refetch, whichClass);
    console.log(data);
  }, [logIn, whichClass]);
  return (
    <div className="tabcontent">
      {isLoading ? (
        <div>Retrieving data from database...</div>
      ) : (
        <div className="infoWindow">
          You have {data.data.length} recordings of your classes
          {error && <div>Something went wrong ...</div>}
        </div>
      )}
      {whichRole === "Admin" ? (
        <form className="cancelAndForgot">
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
          <button
            className="buttonHW"
            onClick={newRecordingsLink !== "" ? insertnewRecording : undefined}
          >
            ⇚ Insert a new recording
          </button>
        </form>
      ) : undefined}
      <div className="linksContainer">
        {isLoading
          ? undefined
          : data.data.map((data, i) => (
              <div className="rowHW" key={"divRHW" + i}>
                <div className="recordings" key={"d" + i}>
                  <a
                    className="recordinglinks"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={data.link}
                    key={"b" + i}
                  >
                    {data.title}
                  </a>
                  <span
                    className="circle"
                    style={{
                      backgroundColor: "gray",
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    {data.keyword}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
