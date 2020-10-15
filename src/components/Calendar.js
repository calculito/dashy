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

  const { isLoading, data } = useQuery("getuserAppointments", () =>
    API.get(`usercalendar/${whichClass}`)
  );

  //////////////  PREPARE DATA FOR WORK WITH IT ////////////////
  let events =
    !isLoading &&
    data.data.forEach(function (obj) {
      obj.date = obj.tdate;
    });
  events = !isLoading && data.data;

  /////////    POST NEW APOINTMENT   ///////////
  async function insertAppointment(evt) {
    evt.preventDefault();
    postAppointment();
  }
  const [postAppointment] = useMutation(
    () =>
      API.post(`/postappointment/${whichClass}`, {
        title: titleNewAppointment,
        date: dateNewAppointment.concat(" +02"),
      }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries("getuserAppointments");
        settitleNewAppointment("");
        setdateNewAppointment("");
        setopenInputWindow(false);
      },
    }
  );

  const cancelInsert = () => {
    settitleNewAppointment("");
    setdateNewAppointment("");
    setopenInputWindow(false);
  };

  return (
    <div className="tabcontent">
      {openInputWindow !== false ? (
        <div className="outPopUpCalendar">
          <form className="calendarForm">
            <input
              type="text"
              placeholder="Titel"
              value={titleNewAppointment}
              onChange={(e) => {
                settitleNewAppointment(e.target.value);
              }}
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
