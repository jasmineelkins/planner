import React, { useState } from "react";

function TimedActivity({ activityObj }) {
  return (
    <div className="timedActivity">
      <span>{activityObj.name}</span>
      <span>{activityObj.time}</span>
    </div>
  );
}

export default TimedActivity;
