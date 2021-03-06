import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
// import useCurrentDate from "./hooks/useCurrentDate";

function Task({
  setCompletedTasks,
  task,
  deleteTaskFromList,
  updateTaskInList,
  completedDate,
  setSelectedTask,
}) {
  const [dropdownChoice, setDropdownChoice] = useState(task.priority);
  const [isChecked, setIsChecked] = useState(task.completed);

  const completedStatusClass = isChecked ? "taskName completed" : "taskName";

  // useEffect to re-render if priority or completed status are updated:
  useEffect(() => {
    const updatedTasks = updateTaskInList(
      task.id,
      dropdownChoice,
      isChecked,
      completedDate
    );
    const completedTaskList = updatedTasks.filter(
      (task) => task.completed === true
    );

    setCompletedTasks(completedTaskList);
  }, [dropdownChoice, isChecked, completedDate]);

  function deleteTask(taskID) {
    fetch(`/tasks/${taskID}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
      }
    });

    deleteTaskFromList(taskID);
  }

  function handleNotesDisplay() {
    console.log("Selected Task:", task);
    console.log("Notes:", task.notes);

    setSelectedTask(task);
  }

  function handleDropdownSelection(e) {
    setDropdownChoice(e.target.value);

    // PATCH dropdown input
    fetch(`/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3002",
      },
      body: JSON.stringify({
        priority: e.target.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("PATCH after dropdown: ", data))
      .catch((error) => console.log(error.message));

    // set the state to update user interface
  }

  function handleCheckedClick(e) {
    setIsChecked(!isChecked);
    console.log("COMPLETED DATE: ", completedDate);

    // PATCH checkbox input data
    fetch(`/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3002",
      },
      body: JSON.stringify({
        completed: !isChecked,
        date_completed: completedDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("PATCH after checkbox: ", data))
      .catch((error) => console.log(error.message));
  }

  return (
    <div className="task">
      <span className={completedStatusClass} onClick={handleNotesDisplay}>
        {task.description}
      </span>

      <select
        className={completedStatusClass}
        name="selectList"
        id="selectList"
        onChange={(e) => handleDropdownSelection(e)}
        value={dropdownChoice}
      >
        <option value="high" className="dropdownOption">
          High
        </option>
        <option value="normal" className="dropdownOption">
          Normal
        </option>
        <option value="low" className="dropdownOption">
          Low
        </option>
      </select>

      <input
        type="checkbox"
        onChange={(e) => handleCheckedClick(e)}
        checked={isChecked}
      ></input>

      <button className="deleteButton" onClick={() => deleteTask(task.id)}>
        <FaTrashAlt />
      </button>
    </div>
  );
}

export default Task;
