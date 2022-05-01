import React, { useState } from "react";
import TimedActivity from "./TimedActivity";

function TimedActivitiesOutput({ activityList }) {
  const listToDisplay = activityList.map((activityObj) => (
    <TimedActivity activityObj={activityObj} key={activityObj.time} />
  ));
  return <div className="timedActivityOutputContainer">{listToDisplay}</div>;
}

export default TimedActivitiesOutput;
