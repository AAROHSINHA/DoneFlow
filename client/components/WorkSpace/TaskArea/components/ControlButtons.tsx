import { Play, Pause, Square } from 'lucide-react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Sentry from "@sentry/react";

interface Props {
    time: number
    title: string
    isRunning: boolean
    isPaused: boolean
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
    setTime: React.Dispatch<React.SetStateAction<number>> 
    setTaskReload: React.Dispatch<React.SetStateAction<boolean>>
    setStartTimestamp: React.Dispatch<React.SetStateAction<number | null>>
    onClose: () => void;
}

function ControlButtons({isRunning, isPaused, setIsRunning, setIsPaused, setTime, time, title, setTaskReload, onClose, setStartTimestamp}: Props) {
  const navigate = useNavigate();
    const getEmail = async () => {
    try{
           const res = await axios.get("http://localhost:5000/users/check-login", {
            withCredentials: true,
          });
          if(!res.data.loggedIn){
              navigate("/");
          }
          return res.data.user.email;
         }catch(error){
              console.log(error);
         }
         return null;
  }

  const handleStart = () => {
  setStartTimestamp(prev => {
    if (prev === null) {
      // First time starting
      return Date.now();
    } else {
      // Resuming → offset start time
      return Date.now() - time * 1000;
    }
  });
  setIsRunning(true);
  setIsPaused(false);
};


  const handlePause = () => {
    setIsPaused(true);
  };

  const handleStop = async () => {
    setIsRunning(false);
    setIsPaused(false);
    const timeInMinutes = (time / 60).toFixed(1);
    const email = await getEmail();
    console.log(timeInMinutes);
    try{
      await axios.post("https://doneflow.onrender.com/tasks/add-time",
        {
          email: email,
          title: title,
          spendTime: timeInMinutes
        }
      )
      
      toast('Good Job!', {
  icon: '👏',
});
    }catch(error){
      Sentry.captureException(error);
      toast.error("Error in saving time! Sorry...");
    }
    setTaskReload(prev => !prev);
    setTime(0);
    onClose();
  };
  return (
    <div className="flex justify-center space-x-4">
          {!isRunning || isPaused ? (
            <button
              onClick={handleStart}
              className="flex items-center justify-center w-16 h-16 bg-pink-400 hover:bg-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-105"
            >
              <Play size={24} fill="white" />
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center justify-center w-16 h-16 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-105"
            >
              <Pause size={24} fill="white" />
            </button>
          )}

          <button
            onClick={handleStop}
            className="flex items-center justify-center w-16 h-16 bg-red-400 hover:bg-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-105"
          >
            <Square size={20} fill="white" />
          </button>
        </div>
  )
}

export default ControlButtons
