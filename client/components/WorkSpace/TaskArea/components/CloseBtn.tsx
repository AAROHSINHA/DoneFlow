import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Sentry from "@sentry/react";
import toast from "react-hot-toast";

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
              console.log(error);
         }
         return null;
  }
  const handleClick = async () => {
    onClose();
    setIsRunning(false);
    setIsPaused(false);
    const timeInMinutes = (time / 60).toFixed(1);
    const email = await getEmail();

    try{
      const res = await axios.post("https://doneflow.onrender.com/tasks/add-time",
        {
          email: email,
          title: title,
          spendTime: timeInMinutes
        }
      )
    }catch(error){
      Sentry.captureException(error);
      toast.error("Error in saving time. Sorry...")
    }
    setTaskReload(prev => !prev);
    setTime(0);
  }

  return (
    <button
          onClick={handleClick}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light cursor-pointer transition-colors duration-200"
        >
          ×
        </button>
  )
}

export default CloseBtn
