import React, { useEffect, useState } from "react";
import RouteButton from "./RouteButton";
import Note from "./Note";

function Notes({ selectedTask }) {
  const [formInput, setFormInput] = useState("");

  function handleFormChange(e) {
    setFormInput(e.target.value);
  }

  function handleAddNote(e) {
    e.preventDefault();

    console.log(formInput);

    //  POST form to Note content, linked to task_id of clicked task
    fetch(`/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        content: formInput,
        task_id: selectedTask.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message));

    setFormInput("");
  }

  function handleResetNotes(e) {
    e.preventDefault();

    // DELETE all notes for that task_id from database

    setFormInput("");
  }

  // Does not re render automatically yet:
  let notesToDisplay = <li></li>;

  if (selectedTask) {
    if (selectedTask.notes === undefined) {
      notesToDisplay = <li>undefined</li>;
    } else if (selectedTask.notes === []) {
      console.log("### notes array is empty", selectedTask.notes);
      notesToDisplay = <li>empty array - no notes saved for this task</li>;
    } else if (selectedTask.notes) {
      console.log("### there are task notes!", selectedTask.notes);
      notesToDisplay = selectedTask.notes.map((note) => (
        <li key={note.id}>{note.content}</li>
      ));
    }
  }

  return (
    <div className="notesContainer griditem item4">
      <div className="leftDiv">
        <div className="buttonBar">
          <RouteButton path="notes" />
          <h3>Notes</h3>
        </div>
        <form onSubmit={handleAddNote}>
          <textarea
            name="content"
            onChange={(e) => handleFormChange(e)}
            value={formInput}
          ></textarea>
          <br></br>
          <button type="submit" className="btn edit">
            Add Note
          </button>

          <button onClick={handleResetNotes} className="btn reset-notes">
            Reset Notes
          </button>
        </form>
      </div>

      <div className="rightDiv">
        <h4>
          {selectedTask.description
            ? `Notes for ${selectedTask.description}:`
            : `Click a Task To View/Edit Notes`}
        </h4>

        <div className="notesOutputContainer">
          <ul>{notesToDisplay}</ul>

          {/* <ul>
            {notesDisplay.notes
              ? notesDisplay.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))
              : null}
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default Notes;
