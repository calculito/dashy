import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Calendar(i) {
  const handleDateClick = (arg) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };
  return (
    <div className="tabcontent">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: "MEETING", date: "2019-08-17" },
          { title: "CLASS", date: "2019-08-19" },
          { title: "CLASS", date: "2019-08-22" },
        ]}
        dateClick={handleDateClick}
      />
    </div>
  );
}
export default Calendar;
