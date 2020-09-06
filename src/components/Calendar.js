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
    { title: "Class", date: "2020-09-09" },
    { title: "Job Fair", date: "2020-09-16" },
    { title: "Class", date: "2020-09-16" },
    { title: "Final presentation", date: "2020-09-30" },
    { title: "Job Fair", date: "2020-10-01" },
    { title: "Graduation", date: "2020-10-03" },
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
