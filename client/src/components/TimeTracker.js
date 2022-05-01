import React, { useState } from "react";
import RouteButton from "./RouteButton";
import TimedActivitiesOutput from "./TimedActivitiesOutput.js";

//useRef helps us to get or control any element's reference

import useTimer from "../hooks/useTimer";

function TimeTracker(props) {
  // import Timer hook
  const {
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    formattedTime,
  } = useTimer(0);

  // set state for activity controlled input form:
  const [activityInput, setActivityInput] = useState({
    name: "",
    time: "",
  });

  // set state for completed timed activities list
  const [activityList, setActivityList] = useState([]);

  function handleInput(e) {
    setActivityInput({
      name: e.target.value,
      time: formattedTime,
    });
  }

  function addActivityToList() {
    setActivityList([...activityList, activityInput]);

    console.log("activity: ", activityInput);
    console.log("timer: ", formattedTime);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (activityInput.name === "") {
      alert("please enter an activity");
    } else {
      addActivityToList();
      console.log("activity list: ", activityList);
      // end timer & submit activity to list

      setActivityInput({ name: "" });
      console.log(activityInput);
    }
  }

  return (
    <div className="timeTrackerContainer griditem item5">
      <RouteButton path="stopwatch" />

      <div className="activityTrackerForm">
        <h3>Stopwatch</h3>
        <form className="activityForm" onSubmit={(e) => handleSubmit(e)}>
          <input
            name="name"
            placeholder="Track an activity"
            onChange={(e) => handleInput(e)}
            value={activityInput.name}
          ></input>
          <input type="submit" value="Save" className="btn save" />
        </form>
      </div>

      <p>{formattedTime}</p>

      <div className="buttons">
        {!isActive && !isPaused ? (
          <button onClick={handleStart} className="btn start">
            Start
          </button>
        ) : isPaused ? (
          <button onClick={handlePause} className="btn pause">
            Pause
          </button>
        ) : (
          <button onClick={handleResume} className="btn resume">
            Resume
          </button>
        )}
        <button
          onClick={handleReset}
          disabled={!isActive}
          className="btn reset"
        >
          Reset
        </button>
      </div>

      <TimedActivitiesOutput activityList={activityList} />
    </div>
  );
}

export default TimeTracker;
