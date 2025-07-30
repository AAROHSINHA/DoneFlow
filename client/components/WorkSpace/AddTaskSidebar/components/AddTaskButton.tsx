import {Plus} from "lucide-react";
import { AddTaskContext } from "./AddTaskContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { addTaskError } from "../../../error_handler";
import { useNavigate } from "react-router-dom";
import * as Sentry from "@sentry/react";

/*
WORKFLOW - 
1. Check if login (Ofc the user will be logged in else how will workspace open but for safety)
2. Add tasks with the email and these contents
*/



interface AddTaskButtonInterface {
    setTaskReload: React.Dispatch<React.SetStateAction<boolean>>
    setReload: React.Dispatch<React.SetStateAction<boolean>>
    onClose: () => void,
    setUpdateStats: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
}

const AddTaskButton:React.FC<AddTaskButtonInterface> = ({setTaskReload, setReload, onClose, setUpdateStats, isOpen}) => {
    const navigate = useNavigate();
    const addTaskContext = useContext(AddTaskContext);
    const [message, setMessage] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const handleAddTask = async () => {
       // check login
        if(addTaskContext?.loggedIn){
            const addtasktodb = await AddTaskToDB(addTaskContext.email);
            if(addtasktodb){
                await IncrementTaskInStats(addTaskContext.email);
                onClose();
                setReload(prev => !prev);
                
            }
            setMessage("");
            
        }else{
            navigate("/");
        }
       setTaskReload(prev => !prev);
       setUpdateStats(prev => !prev);
       
       
    }

    const convertTime = (time: string) => {
        const e = time.split(":");
        const converted_time = parseInt(e[0])*60 + parseInt(e[1]);
        return converted_time;
    }

    const createTask = (email_id : string) => {
        if(!addTaskContext) return;
        const email = email_id;
        const title = addTaskContext.title;
        const tags = addTaskContext.selectedTags;
        const task: Record<string, any> = {
            "email": email,
            "title": title,
            "tags": tags,
        }
        if(addTaskContext.priority) task["priority"] = addTaskContext.priority;
        if(addTaskContext.timerTime) task["estimateTime"] = convertTime(addTaskContext.timerTime);
        if(addTaskContext.deadline){
            task["deadlineDate"] = parseInt(addTaskContext.deadline.split("-")[2]);
            task["deadlineMonth"] = parseInt(addTaskContext.deadline.split("-")[1]);
        }
        return task;
    }

    const AddTaskToDB = async (email_id: string) => {
        setShowCreate(true);
        const task = createTask(email_id);
        try{
            await axios.post("https://doneflow.onrender.com/tasks/add-task", 
                task,
                {withCredentials: true}
            )
            return true;
        }catch(error: any){
            setShowCreate(false);
            if(typeof error == "object"){
                const error_body = error.response.data;
            const error_type: 'validation' | 'server' | 'other' = error_body.type;
            if(error_type == "validation"){
                const validation_error_type: 'email' | 'title' | 'tag' | 'priority' | 'progress' | 'time' | 'date' | 'month' = error_body.error[0].msg
                    setMessage(addTaskError[error_type][validation_error_type])
                }else if(addTaskError[error_type]){
                    setMessage(addTaskError[error_type]);
                    Sentry.captureException(error);
                }
            }else{
                setMessage(addTaskError["other"]);
                Sentry.captureException(error);
            }
            
        }finally{
                setShowCreate(false);
                // setMessage("");
            }
    }

    // To increase totalTaskCount in stats db
    const IncrementTaskInStats = async (email_id: string) => {
        try{
            await axios.patch("https://doneflow.onrender.com/stats/add-task", 
                {email: email_id},
                {withCredentials: true}
            )
        }catch(error: any){
            if(typeof error == "object"){
                const error_body = error.response.data;
            const error_type: 'validation' | 'server' | 'other' = error_body.type;
            if(error_type == "validation"){
                const validation_error_type: 'email' | 'title' | 'tag' | 'priority' | 'progress' | 'time' | 'date' | 'month' = error_body.error[0].msg
                    setMessage(addTaskError[error_type][validation_error_type])
                }else if(addTaskError[error_type]){
                    setMessage(addTaskError[error_type]);
                    Sentry.captureException(error);
                }else{
                    setMessage("Some Error Occurred!")
                }
            }else{
                // console.log(error);
                setMessage(addTaskError["other"]);
                Sentry.captureException(error);
            }
        }
    }

    useEffect(() => {
        setMessage("");
        setShowCreate(false);
    }, [isOpen]);

    return (
        <div className="sticky bottom-0 left-0 right-0 px-4 md:px-6 md:py-3 bg-white border-t border-gray-100 hover:cursor-pointer">
            <p className="font-['Inter'] text-center text-red-600 font-thin text-xl uppercase tracking-wide animate-pulse">{message}</p>
            {showCreate && <div className="flex justify-center items-center">
  <p className="text-[1em] font-semibold animate-pulse text-gray-400 tracking-[3px] mb-[12px]">Adding Task...Just a moment!</p>
</div>}
          <button
            onClick={handleAddTask}
            disabled={!addTaskContext?.title.trim()}
            className="w-full bg-pink-400 text-white py-4 px-6 rounded-xl font-medium hover:bg-pink-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-sm hover:cursor-pointer"
          >
            <Plus size={20} />
            <span>Create Task</span>
          </button>
        </div>
    )
}
export default AddTaskButton;

