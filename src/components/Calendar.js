import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interaction from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useQuery, useMutation, queryCache } from "react-query";
import { API } from "./Impex.js";

export default function Calendar({ whichClass, whichRole }) {
  const [openInputWindow, setopenInputWindow] = useState(false);
  const [titleNewAppointment, settitleNewAppointment] = useState("");
  const [dateNewAppointment, setdateNewAppointment] = useState("");

  const handleDateClick = (arg) => {
    whichRole === "Admin" && setopenInputWindow(1);
  };
  /////////    GET ALL APOINTMENTS  AXIOS  ///////////

  const { isLoading, error, data } = useQuery("getuserAppointments", () =>
    API.get(`usercalendar/${whichClass}`)
  );

  //////////////  PREPARE DATA FOR WORK WITH IT ////////////////
  const dataprep =
    !isLoading &&
    data.data.forEach(function (obj) {
      obj.date = obj.tdate;
      //delete obj.tdate;
    });
  const events = !isLoading && data.data;
  /////////    POST NEW APOINTMENT   ///////////
  async function insertAppointment(evt) {
    setdateNewAppointment(dateNewAppointment.concat(":00Z"));
    evt.preventDefault();
    const data = { title: titleNewAppointment, date: dateNewAppointment };
    await fetch(
      "https://dashybackend.herokuapp.com/postappointment/".concat(whichClass),
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    settitleNewAppointment("");
    setdateNewAppointment("");
    setopenInputWindow(false);
  }

  const cancelInsert = () => {
    settitleNewAppointment("");
    setdateNewAppointment("");
    setopenInputWindow(false);
  };

  return (
    <div className="tabcontent">
      {openInputWindow !== false ? (
        <div className="outPopUpCalendar">
          <form className="header">
            <input
              type="text"
              placeholder="Titel"
              value={titleNewAppointment}
              onChange={(e) => settitleNewAppointment(e.target.value)}
              required
            />
            <input
              type="datetime-local"
              placeholder="Date"
              value={dateNewAppointment}
              onChange={(e) => setdateNewAppointment(e.target.value)}
              required
            />
            <button
              className="buttonHW"
              onClick={
                titleNewAppointment !== "" ? insertAppointment : undefined
              }
            >
              ⇚ Insert a new appointment
            </button>
            <button className="buttonHW" onClick={cancelInsert}>
              Cancel
            </button>
          </form>
        </div>
      ) : undefined}
      {isLoading ? (
        <div>C'mon database, wake up ...</div>
      ) : (
        <div className="infoWindow">
          You have {events.length} appointments in your calendar
        </div>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interaction]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        locale={esLocale}
      />
    </div>
  );
}
