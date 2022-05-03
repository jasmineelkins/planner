import React, { useState } from "react";
import Calendar from "react-calendar/dist/umd/Calendar";
import "../CalendarStyle.css";
import RouteButton from "./RouteButton";

function CalendarComponent({ setCompletedDate }) {
  const [date, setDate] = useState(new Date());

  function handleUpdateDate(value) {
    console.log("SELECTED DATE: ", value.toISOString().slice(0, 10));
    setDate(value);
    setCompletedDate(value.toISOString().slice(0, 10));
  }

  return (
    <div className="griditem item3">
      <div className="calendarContainer">
        <RouteButton path="google-calendar" />

        <div className="innerCalendarContainer">
          <Calendar onChange={handleUpdateDate} value={date} />
        </div>
      </div>
    </div>
  );
}

export default CalendarComponent;
