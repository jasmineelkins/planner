import React, { useState } from "react";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import RouteButton from "./RouteButton";

const defaultFormState = {
  name: "",
  priority: "normal",
  completed: "false",
};

function TaskListContainer({
  taskList,
  setTaskList,
  addNewTaskToList,
  setNotesDisplay,
  completedTasks,
  setCompletedTasks,
  completedDate,
}) {
  const [formState, setFormState] = useState(defaultFormState);

  return (
    <div id="taskListContainerContainer" className="griditem item2">
      <RouteButton path="task-list" />

      <NewTaskForm
        formState={formState}
        setFormState={setFormState}
        defaultFormState={defaultFormState}
        addNewTaskToList={addNewTaskToList}
      />
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
