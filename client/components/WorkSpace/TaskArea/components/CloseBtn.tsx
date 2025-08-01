import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Sentry from "@sentry/react";
import toast from "react-hot-toast";
import { useContext, useState } from 'react';
import { SidebarContext } from '../../SidebarContext';
import TaskActionLoadingOverlay from "../../../Loading/TaskActionLoadingOverlay.tsx";

interface Prop {
    onClose: () => void
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
    setTime: React.Dispatch<React.SetStateAction<number>> 
    setTaskReload: React.Dispatch<React.SetStateAction<boolean>>
    time: number
    title: string
}

function CloseBtn({onClose, setIsRunning, setIsPaused, time, setTaskReload, setTime, title}: Prop) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const sidebarContext = useContext(SidebarContext);
const getEmail = async () => {
    try{
           const res = await axios.get("https://doneflow.onrender.com/users/check-login", {
            withCredentials: true,
          });
          if(!res.data.loggedIn){
              navigate("/");
          }
          return res.data.user.email;
         }catch(error){
              if(error.response) Sentry.captureException(error.response);
              else Sentry.captureException(error);
         }
         return null;
  }
  const handleClick = async () => {
    onClose();
    setIsRunning(false);
    setIsPaused(false);
    const timeInMinutes = (time / 60).toFixed(1);
    let email_to_be = sidebarContext?.email;
    if(!email_to_be) email_to_be = await getEmail();
    setLoading(true);
    try{
      const res = await axios.post("https://doneflow.onrender.com/tasks/add-time",
        {
          email: email_to_be,
          title: title,
          spendTime: timeInMinutes
        }
      )
      toast('Good Job!', {
        icon: '👏',
      });
    }catch(error){
      if(error.response) Sentry.captureException(error.response);
      else Sentry.captureException(error);
      toast.error("Error in saving time. Sorry...")
    }finally{
      setLoading(false);
    }
    setTaskReload(prev => !prev);
    setTime(0);
  }

  return (
    
    <>
    <TaskActionLoadingOverlay isVisible={loading} title='Saving Time!' />
    <button
          onClick={handleClick}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light cursor-pointer transition-colors duration-200"
        >
          ×
        </button>
    </>
  )
}

export default CloseBtn
