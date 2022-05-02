import React, { useState } from "react";
import RouteButton from "./RouteButton";
import TimedActivitiesOutput from "./TimedActivitiesOutput.js";
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

  const [activityInput, setActivityInput] = useState({
    name: "",
    time: "",
  });
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
      <div className="activityTrackerForm">
        <div className="buttonBar">
          <RouteButton path="stopwatch" />
          <h3>Time Tracker</h3>
        </div>

        <form className="activityForm" onSubmit={(e) => handleSubmit(e)}>
          <input
            name="name"
            placeholder="Enter activity"
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
