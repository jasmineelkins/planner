import React, { useState, useEffect } from "react";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import RouteButton from "./RouteButton";
import BASE_URL from "../Config";

function TaskListContainer({
  completedDate,
  completedTasks,
  setCompletedTasks,
  setSelectedTask,
  user,
}) {
  const [taskList, setTaskList] = useState([]);

  // fetch tasks & set taskList
  useEffect(() => {
    // console.log(user);
    getUserTasks();
  }, [user]);

  async function getUserTasks() {
    try {
      const response = await fetch(`${BASE_URL}/users/${user.id}/tasks`);
      const listOfTasks = await response.json();

      console.log(listOfTasks);
      setTaskList(listOfTasks);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="griditem item2 taskListContainerContainer">
      <div className="buttonBar">
        <RouteButton path="task-list" />
        <NewTaskForm
          taskList={taskList}
          setTaskList={setTaskList}
          user={user}
        />
      </div>

      <TaskList
        completedTasks={completedTasks}
        setCompletedTasks={setCompletedTasks}
        taskList={taskList}
        setTaskList={setTaskList}
        completedDate={completedDate}
        setSelectedTask={setSelectedTask}
        user={user}
      />
    </div>
  );
}

export default TaskListContainer;
