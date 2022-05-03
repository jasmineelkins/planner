import React, { useState, useEffect } from "react";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import RouteButton from "./RouteButton";

function TaskListContainer({
  completedDate,
  completedTasks,
  setCompletedTasks,
  selectedTask,
  setSelectedTask,
}) {
  const [taskList, setTaskList] = useState([]);

  // fetch tasks & set taskList
  useEffect(() => {
    fetch(`/tasks`)
      .then((res) => res.json())
      .then((listOfTasks) => setTaskList(listOfTasks))
      .catch((error) => console.log(error.message));
  }, []);

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
        completedDate={completedDate}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
}

export default TaskListContainer;
