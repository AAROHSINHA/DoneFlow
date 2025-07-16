import React, { useState, useEffect, useRef, useMemo } from 'react';
import Header from './components/Header';
import CloseBtn from './components/CloseBtn';
import TimeDisplay from './components/TimeDisplay';
import ControlButtons from './components/ControlButtons';
import StatusText from './components/StatusText';
import Landscape from "./components/Landscape.tsx";
import Landscape2 from "./components/Landscape2.tsx";
import Landscape3 from "./components/Landscape3.tsx";
import Landscape4 from './components/Landscape4.tsx';
import Landscape5 from "./components/Landscape5.tsx";

interface StopwatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle: string;
  estimateTime: number; // in minutes
  spendTime: number, // minutes
  setTaskReload: React.Dispatch<React.SetStateAction<boolean>>
  randomIndex: number
}

const landscapes = [
  Landscape,
  Landscape2,
  Landscape3,
  Landscape4,
  Landscape5
];


const StopwatchModal: React.FC<StopwatchModalProps> = ({ 
  isOpen, 
  onClose, 
  taskTitle = "Current Task",
  estimateTime = 0 ,
  spendTime,
  setTaskReload,
  randomIndex
}) => {
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);


//   useEffect(() => {
//   if (isRunning && !isPaused) {
//     // ⏱ Simulate 1 second = 1 minute (60 seconds)
//     intervalRef.current = setInterval(() => {
//       setTime(prevTime => prevTime + 1); // 60 seconds per tick
//     }, 1000); // run every 1 second
//   } else {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//   }

//   return () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//   };
// }, [isRunning, isPaused]);
useEffect(() => {
  if (isRunning && !isPaused) {
    // Save the current time if timer just started
    if (!startTimestamp) {
      setStartTimestamp(Date.now() - time * 1000);
    }

    intervalRef.current = setInterval(() => {
      if (startTimestamp) {
        const elapsedMs = Date.now() - startTimestamp;
        const elapsedSec = Math.floor(elapsedMs / 1000);
        setTime(elapsedSec);
      }
    }, 1000);
  } else {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
}, [isRunning, isPaused, startTimestamp]);



const RandomLandscapeComponent = landscapes[randomIndex];



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] p-8 relative animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Close button -> Header -> TimeDisplay -> Control Btns -> StatusText */}
        <CloseBtn onClose={onClose} setIsRunning={setIsRunning} setIsPaused={setIsPaused} time={time} setTime={setTime} setTaskReload={setTaskReload} title={taskTitle}/>
        <Header taskTitle={taskTitle}/>
        <RandomLandscapeComponent />
        <div className='w-[100%] h-[1em]'></div>
        <TimeDisplay time={time} estimateTime={estimateTime} spendTime={spendTime} />
        <ControlButtons time={time} title={taskTitle} isRunning={isRunning} isPaused={isPaused} setIsRunning={setIsRunning} setIsPaused={setIsPaused} setTime={setTime} setTaskReload={setTaskReload} onClose={onClose} setStartTimestamp={setStartTimestamp} />
        <StatusText isRunning={isRunning} isPaused={isPaused} time={time} />
      </div>
    </div>
  );
};

export default StopwatchModal;