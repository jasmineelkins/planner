import React, { useState } from "react";
import BASE_URL from "../Config";

const defaultFormState = {
  description: "",
  priority: "normal",
  completed: "false",
};

function NewTaskForm({ taskList, setTaskList, user }) {
  const [formState, setFormState] = useState(defaultFormState);
  const { description, priority } = formState;

  function addNewTaskToList(newTask) {
    const updatedTaskList = [...taskList, newTask];

    setTaskList(updatedTaskList);
  }

  function handleFormChange(e) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createNewTask();

    setFormState(defaultFormState);
  }

  async function createNewTask() {
    console.log(user);
    try {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "http://localhost:4000",
        },
        body: JSON.stringify({
          description: description,
          priority: priority,
          completed: false,
          date_completed: "",
          date_added: "",
          user_id: user.id,
        }),
      });
      const newTaskObj = await response.json();

      console.log("New Task: ", newTaskObj);
      addNewTaskToList(newTaskObj);
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  }

  return (
    <div className="newTaskFormContainer">
      <form className="newTaskForm" onSubmit={(e) => handleSubmit(e)}>
        <input
          name="description"
          placeholder="Enter task"
          onChange={(e) => handleFormChange(e)}
          value={description}
        ></input>

        <select
          name="priority"
          id="priority"
          onChange={(e) => handleFormChange(e)}
          value={priority}
        >
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </select>

        <input type="submit" value="Add to list" className="btn submit" />
      </form>
    </div>
  );
}

export default NewTaskForm;
