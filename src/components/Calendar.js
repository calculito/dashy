import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interaction from "@fullcalendar/interaction";

function Calendar(i) {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };
  return (
    <div className="tabcontent">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interaction]}
        initialView="dayGridMonth"
        events={[
          { title: "MEETING", date: "2020-08-17" },
          { title: "CLASS", date: "2020-08-19" },
          { title: "CLASS", date: "2020-08-22" },
        ]}
        dateClick={handleDateClick}
      />
    </div>
  );
}
export default Calendar;
