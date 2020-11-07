import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { sound, starblack, stargold, API } from "./Impex";
import axios from "axios";
import { useMutation } from "react-query";
function Links({ userName, whichClass, whichRole, whichUserId }) {
  const { speak } = useSpeechSynthesis();
  const [linksInsertFieldG, setlinksInsertFieldG] = useState("");
  const [linksInsertFieldP, setlinksInsertFieldP] = useState("");
  const [linkToDelete, setlinkToDelete] = useState(1);
  const [appState, setAppState] = useState({
    loading: null,
    genLinks: null,
    persLinks: null,
  });
  console.log("render...");
  useEffect(() => {
    axios
      .all([
        axios.get(`https://dashybackend.herokuapp.com/userlinks/${whichClass}`),
        axios.get(
          `https://dashybackend.herokuapp.com/userpersonallinks/${userName}`
        ),
      ])
      .then((response) => {
        setAppState({
          loading: false,
          genLinks: response[0].data,
          persLinks: response[1].data,
        });
      });
  }, [
    setAppState,
    linkToDelete,
    whichClass,
    linksInsertFieldP,
    linksInsertFieldG,
  ]);

  /////////    POST PERSONAL LINKS     ///////////
  const [newPersonalLink] = useMutation(
    () =>
      API.post(`/postpersonallink/${whichUserId}`, {
        link: linksInsertFieldP,
      }),
    {
      onSuccess: () => {
        setlinksInsertFieldP("");
      },
      onError: () => {
        alert("Please check the link, you already have this one!");
      },
    }
  );
  /////////    POST GENERAL LINKS     ///////////
  const [newGeneralLink] = useMutation(
    () =>
      API.post(`/postgenerallink/${whichClass}`, {
        link: linksInsertFieldG,
      }),
    {
      onSuccess: () => {
        setlinksInsertFieldG("");
      },
    }
  );

  /////////    DELETE GENERAL LINKS     ///////////
  async function deleteGeneralLink(id) {
    setlinkToDelete(id);
    await API.delete(`/deletegenlink/${id}`);
    setlinkToDelete("");
  }

  /////////    DELETE PERSONAL LINKS     ///////////
  async function deletePersonalLink(id) {
    setlinkToDelete(id);
    await API.delete(`/deletepersonallink/${id}`);
    setlinkToDelete("");
  }

  ///////////////    CHANGE STARS PERSONAL LINKS       /////////////
  async function changestarspers(e, id) {
    setlinkToDelete(e);
    await API.put(`/personallinkstars/${id}`, { link: e });
    setlinkToDelete("");
  }
  ///////////////    CHANGE STARS GENERAL LINKS       /////////////
  async function changestars(e, id) {
    setlinkToDelete(e);
    await API.put(`/generallinkstars/${id}`, { link: e });
    setlinkToDelete("");
  }
  ///////////  SOUND READ LOUD  /////////////
  function soundloud(toread) {
    speak({
      text: toread,
    });
  }

  function StarsGen(data) {
    let starsall = [];
    for (let i = 0; i < 5; i++) {
      starsall.push(
        <img
          className="starSymbols"
          src={data.stars > i ? stargold : starblack}
          alt="star"
          key={i}
          onClick={() => changestars(i + 1, data.id)}
        />
      );
    }
    return starsall;
  }
  function StarsPers(data) {
    let starsall = [];
    for (let i = 0; i < 5; i++) {
      starsall.push(
        <img
          className="starSymbols"
          src={data.stars > i ? stargold : starblack}
          alt="star"
          key={i}
          onClick={() => changestarspers(i + 1, data.id)}
        />
      );
    }
    return starsall;
  }

  return (
    <div className="tabcontent">
      <div className="infoWindow">
        {appState.loading === false ? (
          <span>
            You have {appState.persLinks.length} personal links and{" "}
            {appState.genLinks.length} general links
          </span>
        ) : (
          <div>Fetching data...</div>
        )}
      </div>
      <div id="links" className="twoColumns">
        <div className="halfContainer">
          <div className="contLinks">
            <form
              className="cancelAndForgot"
              onSubmit={(e) => {
                e.preventDefault();
                newGeneralLink();
              }}
            >
              <input
                className="inputLinks"
                type="text"
                placeholder="General links"
                value={linksInsertFieldG}
                onChange={(e) => setlinksInsertFieldG(e.target.value)}
                required
              />
              {whichRole !== "Student" && (
                <button className="buttonHW" type="submit">
                  ⇚ Insert a general link
                </button>
              )}
            </form>
          </div>

          <div className="linksContainer">
            {appState.loading === false &&
              appState.genLinks.map((data, index) => {
                return (
                  <div className="rowHW" key={"divRHW" + index}>
                    <div className="recordings" key={"divG" + index}>
                      <div>
                        <img
                          src={"https://www.google.com/s2/favicons?domain=".concat(
                            data.description
                          )}
                          alt="icon"
                        ></img>
                        <a
                          className="recordinglinks"
                          href={data.description}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={index}
                        >
                          {window.innerHeight < 1000
                            ? `${data.description.substring(0, 30)}...`
                            : `${data.description.substring(0, 50)}...`}
                        </a>
                      </div>
                      <div className="infoContLinks">
                        {whichRole !== "Student" && (
                          <span
                            className="circle"
                            onClick={() => deleteGeneralLink(data.id)}
                          >
                            DEL
                          </span>
                        )}
                        <span className="circleNonClick">{index + 1}</span>
                        <div>
                          <StarsGen stars={data.stars} id={data.id} />
                        </div>
                        <img
                          className="linkSymbols"
                          src={sound}
                          alt="speaker"
                          onClick={(e) => soundloud(data.description)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="halfContainer">
          <div className="contLinks">
            <form
              className="cancelAndForgot"
              onSubmit={(e) => {
                e.preventDefault();
                newPersonalLink();
              }}
            >
              <input
                className="inputLinks"
                type="text"
                placeholder="Personal links"
                value={linksInsertFieldP}
                onChange={(e) => setlinksInsertFieldP(e.target.value)}
                required
              />
              <button className="buttonHW" type="submit">
                ⇚ Insert a personal link
              </button>
            </form>
          </div>
          <div className="linksContainer">
            {appState.loading === false &&
              appState.persLinks.map((data, index) => {
                return (
                  <div className="rowHW" key={"divRHW" + index}>
                    <div className="recordings" key={"divP" + index}>
                      <div>
                        <img
                          src={"https://www.google.com/s2/favicons?domain=".concat(
                            data.description
                          )}
                          alt="icon"
                        ></img>
                        <a
                          className="recordinglinks"
                          href={data.description}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={index}
                        >
                          {window.innerHeight < 1000
                            ? `${data.description.substring(0, 30)}...`
                            : `${data.description.substring(0, 50)}...`}
                        </a>
                      </div>
                      <div className="infoContLinks">
                        <span
                          className="circle"
                          onClick={(e) => deletePersonalLink(data.id)}
                        >
                          DEL
                        </span>

                        <div>
                          <StarsPers stars={data.stars} id={data.id} />
                        </div>
                        <img
                          className="linkSymbols"
                          src={sound}
                          alt="speaker"
                          onClick={(e) => soundloud(data.description)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(Links);
