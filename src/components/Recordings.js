import React, { useEffect } from "react";
import { useQuery, queryCache } from "react-query";
import { API, NewRecording } from "./Impex";

export default function Recordings({ userName, whichClass, whichRole }) {
  //////////////  GET RECORDINGS /////////////
  const fetchRecordings = async () => {
    const { data } = await API.get(`userrecordings/${userName}`);
    return data;
  };

  const { data: data1query, status: status1query } = useQuery(
    //assign names to data, status in order to do multiple queries!!
    "recordings",
    fetchRecordings,
    {
      staleTime: 5000,
      cacheTime: 10,
    }
  );

  useEffect(() => {
    console.log(whichClass);
    queryCache.invalidateQueries("recordings");
  }, [whichClass]);

  const RecordingsOverview = (recordings) => {
    return recordings.map((recording, i) => {
      return (
        <div className="rowHW" key={"divRHW" + i}>
          <div className="recordings" key={"d" + i}>
            <a
              className="recordinglinks"
              target="_blank"
              rel="noopener noreferrer"
              href={recording.link}
              key={"b" + i}
            >
              {recording.title}
            </a>
            <span
              className={whichRole === "Admin" ? "circle" : "circleNonClick"}
            >
              {recording.keyword}
            </span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="tabcontent">
      {status1query !== "success" ? (
        <div>Retrieving data from database...</div>
      ) : (
        <div className="infoWindow">
          You have {data1query.length} recordings of this class
          {status1query === "error" && <div>Something went wrong ...</div>}
        </div>
      )}
      <div className="halfContainer">
        {whichRole === "Admin" ? (
          <NewRecording whichClass={whichClass} />
        ) : undefined}
        {status1query === "loading" ? (
          <div>Loading...</div>
        ) : (
          <div className="linksContainer">{RecordingsOverview(data1query)}</div>
        )}
      </div>
    </div>
  );
}
