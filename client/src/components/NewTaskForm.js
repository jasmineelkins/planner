import React, { useState } from "react";

const defaultFormState = {
  description: "",
  priority: "normal",
  completed: "false",
};

function NewTaskForm({ taskList, setTaskList }) {
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

    fetch(`/tasks`, {
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
      }),
    })
      .then((res) => res.json())
      .then((newTaskObj) => {
        addNewTaskToList(newTaskObj);
        console.log("New task object:", newTaskObj);
      })
      // .then((newTaskObj) => console.log("New task object:", newTaskObj))
      .catch((error) => console.log("Error:", error.message));

    setFormState(defaultFormState);
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
