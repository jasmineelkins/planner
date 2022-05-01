import React from "react";
import { ReactEmbeddedGoogleCalendar } from "react-embedded-google-calendar";
import { useNavigate } from "react-router-dom";
import { FiChevronsLeft } from "react-icons/fi";

function GoogleCalendar(props) {
  const navigate = useNavigate();

  return (
    <div className="googleCalendarContainer item8">
      <button onClick={() => navigate(-1)} className="btn return">
        <FiChevronsLeft />
      </button>

      <ReactEmbeddedGoogleCalendar
        publicUrl="https://calendar.google.com/calendar/embed?src=c_5j1n89dvsl8729eakhilr78d0o%40group.calendar.google.com&ctz=America%2FNew_York"
        height="600px"
        width="600px"
      />
    </div>
  );
}

export default GoogleCalendar;
