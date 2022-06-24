import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

import Header from "./components/Header";
import TaskListContainer from "./components/TaskListContainer";
import CalendarComponent from "./components/CalendarContainer";
import Notes from "./components/Notes";
import Heatmap from "./components/Heatmap";
import TimeTracker from "./components/TimeTracker";
import GoogleCalendar from "./components/GoogleCalendar";
import DailyQuote from "./components/DailyQuote";
import Footer from "./components/Footer";

import SignUp from "./components/Signup";
import Login from "./components/Login";
import AuthBar from "./components/AuthBar";

import BASE_URL from "./Config";

function App() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [completedDate, setCompletedDate] = useState(
    new Date().toISOString().slice(0, 9)
  );
  const [selectedTask, setSelectedTask] = useState({});
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState();

  // const navigate = useNavigate();

  useEffect(() => {
    // auto-login
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    try {
      const response = await fetch(`${BASE_URL}/me`);
      const currentUserObj = await response.json();

      console.log("Current user: ", currentUserObj);
      if (currentUserObj.username) {
        // navigate("/");
        setUser(currentUserObj);
        setErrors(null);
      } else {
        if (currentUserObj.errors) {
          setErrors(currentUserObj.errors);
        } else {
          setErrors(null);
        }

        setUser(null);
      }
    } catch (error) {
      console.log("ERROR:, ", error.message);
    }
  }

  return (
    <div className="pageContainer">
      <div className="contentWrap">
        <BrowserRouter>
          <Header user={user} setUser={setUser} />
          <Routes>
            <>
              {user ? (
                <Route
                  path="/"
                  element={
                    <div className="gridContainer">
                      <div className="App leftColumn leftGridItem">
                        <TaskListContainer
                          completedDate={completedDate}
                          completedTasks={completedTasks}
                          setCompletedTasks={setCompletedTasks}
                          selectedTask={selectedTask}
                          setSelectedTask={setSelectedTask}
                          user={user}
                        />
                        <Notes selectedTask={selectedTask} />
                      </div>

                      <div className="rightColumn rightGridItem">
                        <DailyQuote />
                        <CalendarComponent
                          setCompletedDate={setCompletedDate}
                          completedDate={completedDate}
                        />
                        <TimeTracker />
                      </div>
                      {/* <Heatmap completedTasks={completedTasks} /> */}
                    </div>
                  }
                ></Route>
              ) : (
                <>
                  <Route
                    path="/signup"
                    element={<SignUp setUser={setUser} />}
                  ></Route>

                  <Route
                    path="/login"
                    element={<Login setUser={setUser} />}
                  ></Route>

                  <Route
                    path="/"
                    element={
                      <div className="gridContainer">
                        <div className="App leftColumn leftGridItem">
                          <TaskListContainer
                            completedDate={completedDate}
                            completedTasks={completedTasks}
                            setCompletedTasks={setCompletedTasks}
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
                          />
                          <Notes selectedTask={selectedTask} />
                        </div>

                        <div className="rightColumn rightGridItem">
                          <DailyQuote />
                          <CalendarComponent
                            setCompletedDate={setCompletedDate}
                            completedDate={completedDate}
                          />
                          <TimeTracker />
                        </div>
                        {/* <Heatmap completedTasks={completedTasks} /> */}
                      </div>
                    }
                  ></Route>
                </>
              )}
            </>

            <Route
              path="task-list"
              element={
                <TaskListContainer
                  completedDate={completedDate}
                  completedTasks={completedTasks}
                  setCompletedTasks={setCompletedTasks}
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
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
              element={<Notes selectedTask={selectedTask} />}
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
