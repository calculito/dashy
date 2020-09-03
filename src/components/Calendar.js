import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interaction from "@fullcalendar/interaction";

function Calendar({ userName }) {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const events = [
    { title: "MEETING", date: "2020-08-26" },
    { title: "MEETING", date: "2020-08-31" },
    { title: "MEETING", date: "2020-09-02" },
  ];

  return (
    <div className="tabcontent">
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
