import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import CloseBtn from './components/CloseBtn';
import TimeDisplay from './components/TimeDisplay';
import ControlButtons from './components/ControlButtons';
import StatusText from './components/StatusText';
import CompleteButton from './components/CompleteButton';

interface StopwatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle: string;
  estimateTime: number; // in minutes
  spendTime: number, // minutes
  setTaskReload: React.Dispatch<React.SetStateAction<boolean>>
}

const StopwatchModal: React.FC<StopwatchModalProps> = ({ 
  isOpen, 
  onClose, 
  taskTitle = "Current Task",
  estimateTime = 0 ,
  spendTime,
  setTaskReload
}) => {
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
  if (isRunning && !isPaused) {
    // ⏱ Simulate 1 second = 1 minute (60 seconds)
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1); // 60 seconds per tick
    }, 1000); // run every 1 second
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
}, [isRunning, isPaused]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Close button -> Header -> TimeDisplay -> Control Btns -> StatusText */}
        <CloseBtn onClose={onClose} setIsRunning={setIsRunning} setIsPaused={setIsPaused} time={time} setTime={setTime} setTaskReload={setTaskReload} title={taskTitle}/>
        <Header taskTitle={taskTitle}/>
        <TimeDisplay time={time} estimateTime={estimateTime} spendTime={spendTime} />
        <ControlButtons time={time} title={taskTitle} isRunning={isRunning} isPaused={isPaused} setIsRunning={setIsRunning} setIsPaused={setIsPaused} setTime={setTime} setTaskReload={setTaskReload} />
        <StatusText isRunning={isRunning} isPaused={isPaused} time={time} />
      </div>
    </div>
  );
};

export default StopwatchModal;