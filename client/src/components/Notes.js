import React, { useState } from "react";
import RouteButton from "./RouteButton";
import Note from "./Note";

function Notes({ notesDisplay, updateNotes }) {
  function handleNote(e) {
    e.preventDefault();

    const newTaskNotes = {
      ...notesDisplay,
      notes: [...notesDisplay.notes, e.target.notes.value],
    };

    fetch(`http://localhost:3000/tasks/${notesDisplay.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskNotes),
    })
      .then((res) => res.json())
      .then((updatedTask) => updateNotes(updatedTask));

    e.target.reset();
  }

  function handleResetNotes(e) {
    e.preventDefault();

    const newTaskNotes = { ...notesDisplay, notes: [] };

    fetch(`http://localhost:3000/tasks/${notesDisplay.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskNotes),
    })
      .then((res) => res.json())
      .then((updatedTask) => updateNotes(updatedTask));
  }

  // const notesToDisplay = notesDisplay.map((note) => console.log(note));

  return (
    <div className="notesContainer griditem item4">
      <div className="leftDiv">
        <div className="buttonBar">
          <RouteButton path="notes" />
          <h3>Notes</h3>
        </div>
        <form onSubmit={handleNote}>
          <textarea name="notes"></textarea>
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
          {notesDisplay.name
            ? `Notes for ${notesDisplay.name}:`
            : `Click a Task To Edit Notes`}
        </h4>

        <div className="notesOutputContainer">
          {/* <ul>{notesToDisplay}</ul> */}

          <ul>
            {notesDisplay.notes
              ? notesDisplay.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Notes;
