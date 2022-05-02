import React from "react";
import Task from "./Task";

function TaskList({
  completedTasks,
  setCompletedTasks,
  taskList,
  setTaskList,
  setNotesDisplay,
  notes,
  completedDate,
  setSelectedTask,
}) {
  function deleteTaskFromList(taskID) {
    const updatedListToDisplay = taskList.filter((task) => task.id !== taskID);
    setTaskList(updatedListToDisplay);
  }

  function updateTaskInList(taskID, dropdownChoice, isChecked, currentDate) {
    const updatedListToDisplay = taskList.map((task) => {
      if (task.id === taskID) {
        return {
          ...task,
          priority: dropdownChoice,
          completed: isChecked,
          date: completedDate,
        };
      } else {
        return task;
      }
    });

    setTaskList(updatedListToDisplay);
    return updatedListToDisplay;
  }

  const sortOrder = ["high", "normal", "low"];
  const tasksToDisplay = taskList
    .sort(
      (x, y) => sortOrder.indexOf(x.priority) - sortOrder.indexOf(y.priority)
    )
    .map((task) => (
      <Task
        taskList={taskList}
        task={task}
        key={task.id}
        deleteTaskFromList={deleteTaskFromList}
        updateTaskInList={updateTaskInList}
        setNotesDisplay={setNotesDisplay}
        notes={notes}
        completedTasks={completedTasks}
        setCompletedTasks={setCompletedTasks}
        completedDate={completedDate}
        setSelectedTask={setSelectedTask}
      />
    ));

  return <div id="taskList">{tasksToDisplay}</div>;
}

export default TaskList;
