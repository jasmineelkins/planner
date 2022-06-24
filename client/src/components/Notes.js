import React, { useEffect, useState } from "react";
import RouteButton from "./RouteButton";
import BASE_URL from "../Config";
// import Note from "./Note";

function Notes({ selectedTask }) {
  const [formInput, setFormInput] = useState("");
  const [notesList, setNotesList] = useState([
    { content: "click a task to view/add notes", id: "0" },
  ]);

  useEffect(() => {
    getTaskNotes();
  }, [selectedTask]);

  function handleFormChange(e) {
    setFormInput(e.target.value);
  }

  function handleAddNote(e) {
    e.preventDefault();
    console.log(formInput);

    createNewNote();
    setFormInput("");
  }

  async function getTaskNotes() {
    try {
      const response = await fetch(
        `${BASE_URL}/tasks/${selectedTask.id}/notes`
      );
      const taskNotes = await response.json();

      console.log("Selected task's notes: ", taskNotes);
      setNotesList(taskNotes);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function createNewNote() {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: formInput,
          task_id: selectedTask.id,
        }),
      });
      const noteObj = await response.json();

      console.log("noteObj: ", noteObj);
      setNotesList([...notesList, noteObj]);
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  }

  function handleResetNotes(e) {
    e.preventDefault();

    // DELETE all notes for that task_id
    resetTaskNotes();

    setFormInput("");
  }

  async function resetTaskNotes() {
    try {
      const response = await fetch(`${BASE_URL}/reset/${selectedTask.id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      console.log("IS THIS WORKING?");

      // then reset notesToDisplay- like this?
      getTaskNotes();

      // OR this?
      setNotesList([]);
    } catch (error) {
      console.log(error.message);
    }
  }

  const notesToDisplay = notesList.map((note) => (
    <li key={note.id}>{note.content}</li>
  ));

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
            : ` `}
        </h4>

        <div className="notesOutputContainer">
          {selectedTask.id ? (
            <ul>{notesToDisplay}</ul>
          ) : (
            <span className="defaultNote">click a task to view/add notes</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notes;
