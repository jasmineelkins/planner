import { useState, useRef } from "react";

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    // starts timer
    // setInterval method runs until stopped, takes a callback and time in ms

    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    // pauses timer (toggle pause/resume??)
    // setInterval keeps calling itself until clearInterval is called
    // clearInterval takes one param: id (we will pass countRef.current)

    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    // resumes timer from where it was paused

    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    // stops timer & resets everything to initial values
    // also submits tracked project to list??

    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  const formatTime = () => {
    // displays time in 00:00:00 format
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const formattedTime = formatTime(timer);

  return {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    formattedTime,
  };
};

export default useTimer;
