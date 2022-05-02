import React, { useState, useEffect } from "react";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import RouteButton from "./RouteButton";

function TaskListContainer({
  notesDisplay,
  setNotesDisplay,
  completedDate,
  completedTasks,
  setCompletedTasks,
}) {
  const [taskList, setTaskList] = useState([]);

  // fetch tasks & set taskList state when notesDisplay is updated (ie new note added)
  useEffect(() => {
    fetch(`/tasks`)
      .then((res) => res.json())
      .then((listOfTasks) => setTaskList(listOfTasks))
      .catch((error) => console.log(error.message));
  }, [notesDisplay]);

  return (
    <div className="griditem item2 taskListContainerContainer">
      <div className="buttonBar">
        <RouteButton path="task-list" />
        <NewTaskForm taskList={taskList} setTaskList={setTaskList} />
      </div>

      <TaskList
        completedTasks={completedTasks}
        setCompletedTasks={setCompletedTasks}
        taskList={taskList}
        setTaskList={setTaskList}
        setNotesDisplay={setNotesDisplay}
        completedDate={completedDate}
      />
    </div>
  );
}

export default TaskListContainer;
