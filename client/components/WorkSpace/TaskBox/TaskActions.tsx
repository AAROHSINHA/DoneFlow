import { Check, Trash2 } from 'lucide-react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Sentry from "@sentry/react";

interface ActionOptionsProps {
  taskIndex: number
  hidden: boolean
  title: string
  tags: string[]
  setTaskReload: React.Dispatch<React.SetStateAction<boolean>>
  handleMouseLeave: () => void,
  setUpdateTags: React.Dispatch<React.SetStateAction<boolean>>
  setUpdateStats: React.Dispatch<React.SetStateAction<boolean>>
  deadlineDate: number,
  deadlineMonth: number,
  isLoggedIn: boolean | undefined,
  email: string | undefined
}

const TaskActionOptions: React.FC<ActionOptionsProps> = ({ taskIndex, hidden, title, tags, setTaskReload, handleMouseLeave, setUpdateTags, setUpdateStats, deadlineDate, deadlineMonth, isLoggedIn, email }) => {
  const isLastColumn = (taskIndex + 1) % 4 === 0;
  if(hidden) return;
  const navigate = useNavigate();
  const getEmail = () => {
    if(isLoggedIn){
      return email;
    }else{
      navigate("/");
      return null;
    }
  }

  const deleteTask = async () => {
    const email_id = getEmail();
    if(!email_id) navigate("/");
    try{
      const res = await axios.post("https://doneflow.onrender.com/tasks/delete-task", 
        {email: email_id, title: title, tags: tags},
        {withCredentials: true}
      )
      if(res.data.type == "success" && email_id) decrementTaskInStats(email_id);
    }catch(error) {
      Sentry.captureException(error);
      toast.error("Some Error Occurred!");
    }
    setUpdateTags(prev => !prev);
    setTaskReload(prev => !prev);
    setUpdateStats(prev => !prev);
    handleMouseLeave();
  }

  const decrementTaskInStats = async (email_id: string) => {
    try{
      await axios.patch("https://doneflow.onrender.com/stats/delete-task", 
        {email: email_id},
        {withCredentials: true}
      )
    }catch(error){
      Sentry.captureException(error);
      toast.error("Some Error Occurred!");
    }
  }

  const completeTask = async () => {
    const email_id = getEmail();
    if(!email_id) navigate("/");
    try{
      const res = await axios.patch("https://doneflow.onrender.com/stats/complete-task", 
        {email: email_id, title: title, deadlineDate: deadlineDate, deadlineMonth: deadlineMonth},
        {withCredentials: true}
      )
      if(res.data.type == "success"){
      await axios.post("https://doneflow.onrender.com/tasks/delete-task", 
        {email: email_id, title: title, tags: tags},
        {withCredentials: true}
      )
      toast.success("Task completed!");
    }
    }catch(error){
      toast.error("Some Error Occurred!");
    }
    setUpdateTags(prev => !prev);
    setTaskReload(prev => !prev);
    setUpdateStats(prev => !prev);
    handleMouseLeave();
  }

  return (
    <div
      className={`absolute ${isLastColumn ? 'sm:bottom-full md:right-full top-100' : 'sm:bottom-full md:left-full bottom-100 ml-[1.4em]'} z-50 flex flex-col gap-2 w-54 bg-white border border-pink-200 rounded-lg shadow-lg p-2`}
    >
      <button
        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150 rounded-md hover:cursor-pointer"
        onClick={completeTask}
      >
        <Check size={16} className="mr-3 text-green-500" />
        Mark as complete
      </button>

      <button
        onClick={deleteTask}
        className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 rounded-md hover:cursor-pointer"
      >
        <Trash2 size={16} className="mr-3 text-red-500" />
        Delete
      </button>
    </div>
  );
};


export default TaskActionOptions;
