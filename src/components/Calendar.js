import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interaction from "@fullcalendar/interaction";

function Calendar({ whichClass }) {
  const [appointments, setappointments] = useState([
    { title: "MEETING", date: "2020-08-26" },
  ]);

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  function getuserAppointments() {
    let endpoint = "https://dashybackend.herokuapp.com/usercalendar/".concat(
      whichClass
    );
    fetch(endpoint)
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
  useEffect(() => {
    getuserAppointments();
  }, [whichClass]);
  //console.log("appoint" + Object.keys(appointments[0]));
  let events = appointments;

  return (
    <div className="tabcontent">
      <div className="infoWindow">
        You have {events.length} appointments in your calendar
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interaction]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
    </div>
  );
}
export default Calendar;
