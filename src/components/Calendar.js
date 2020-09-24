import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interaction from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

export default function Calendar({ whichClass, whichRole }) {
  const [appointments, setappointments] = useState([
    { title: "MEETING", date: "2020-08-26" },
  ]);
  const [openInputWindow, setopenInputWindow] = useState(false);
  const [titleNewAppointment, settitleNewAppointment] = useState("");
  const [dateNewAppointment, setdateNewAppointment] = useState("");

  const handleDateClick = (arg) => {
    whichRole === "Admin" && setopenInputWindow(1);
  };
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
  /////////    GET ALL APOINTMENTS    ///////////
  async function getuserAppointments() {
    let endpoint = "https://dashybackend.herokuapp.com/usercalendar/".concat(
      whichClass
    );
    await fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        //rename keys in object for use 'date', 'start' and 'end'
        data.forEach(function (obj) {
          obj.date = obj.tdate;
          delete obj.tdate;
        });
        setappointments(data);
      });
  }
  function cancelInsert() {
    settitleNewAppointment("");
    setdateNewAppointment("");
    setopenInputWindow(false);
  }
  useEffect(() => {
    getuserAppointments();
  }, [whichClass, openInputWindow]);
  //console.log("appoint" + Object.keys(appointments[0]));
  let events = appointments;

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
      <div className="infoWindow">
        You have {events.length} appointments in your calendar
      </div>
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
