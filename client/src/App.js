import React, { useState } from "react";
import Header from "./components/Header";
import TaskListContainer from "./components/TaskListContainer";
import CalendarComponent from "./components/CalendarContainer";
import Notes from "./components/Notes";
import Heatmap from "./components/Heatmap";
import TimeTracker from "./components/TimeTracker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoogleCalendar from "./components/GoogleCalendar";
import DailyQuote from "./components/DailyQuote";
import Footer from "./components/Footer";

function App() {
  const [notesDisplay, setNotesDisplay] = useState({});
  const [completedTasks, setCompletedTasks] = useState([]);
  const [completedDate, setCompletedDate] = useState(new Date().toISOString());

  function updateNotes(updatedTask) {
    setNotesDisplay(updatedTask);
  }

  return (
    <div className="pageContainer">
      <div className="contentWrap">
        <Header />

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="App gridContainer">
                  <TaskListContainer
                    notesDisplay={notesDisplay}
                    setNotesDisplay={setNotesDisplay}
                    completedDate={completedDate}
                    completedTasks={completedTasks}
                    setCompletedTasks={setCompletedTasks}
                  />
                  <DailyQuote />
                  <CalendarComponent
                    setCompletedDate={setCompletedDate}
                    completedDate={completedDate}
                  />
                  <Notes
                    notesDisplay={notesDisplay}
                    updateNotes={updateNotes}
                  />
                  <TimeTracker />
                  <Heatmap completedTasks={completedTasks} />
                </div>
              }
            ></Route>

            <Route
              path="task-list"
              element={
                <TaskListContainer
                  notesDisplay={notesDisplay}
                  setNotesDisplay={setNotesDisplay}
                  completedDate={completedDate}
                  completedTasks={completedTasks}
                  setCompletedTasks={setCompletedTasks}
                />
              }
            ></Route>

            <Route
              path="calendar"
              element={
                <CalendarComponent setCompletedDate={setCompletedDate} />
              }
            ></Route>

            <Route path="google-calendar" element={<GoogleCalendar />}></Route>

            <Route
              path="notes"
              element={
                <Notes notesDisplay={notesDisplay} updateNotes={updateNotes} />
              }
            ></Route>

            <Route path="stopwatch" element={<TimeTracker />}></Route>

            <Route
              path="heatmap"
              element={
                <Heatmap
                  completedTasks={completedTasks}
                  completedDate={completedDate}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>

      <Footer />
    </div>
  );
}

export default App;
