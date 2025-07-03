import {Plus} from "lucide-react";
import { AddTaskContext } from "./AddTaskContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/*
WORKFLOW - 
1. Check if login (Ofc the user will be logged in else how will workspace open but for safety)
2. Add tasks with the email and these contents
*/

interface AddTaskButtonInterface {
    setTaskReload: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTaskButton:React.FC<AddTaskButtonInterface> = ({setTaskReload}) => {
    const navigate = useNavigate();
    const addTaskContext = useContext(AddTaskContext);
    const handleAddTask = async () => {
       // check login

       try{
         const res = await axios.get("http://localhost:5000/users/check-login", {
          withCredentials: true,
        });
        if(res.data.loggedIn){
            AddTaskToDB(res.data.user.email);
        }else{
            navigate("/");
        }
       }catch(error){
            alert("Error Adding Task");
            console.log(error);
       }
       setTaskReload(prev => !prev);
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
        const task = createTask(email_id);
        console.log(task);
        try{
            const res = await axios.post("http://localhost:5000/tasks/add-task", 
                task,
                {withCredentials: true}
            )
            console.log(res)
        }catch(error){
            alert("Error Adding Task");
            console.log("Error adding task");
            console.log(error);
        }
    }

    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-white border-t border-gray-100 hover:cursor-pointer">
          <button
            onClick={handleAddTask}
            disabled={!addTaskContext?.title.trim()}
            className="w-full bg-pink-400 text-white py-4 px-6 rounded-xl font-medium hover:bg-pink-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-sm"
          >
            <Plus size={20} />
            <span>Create Task</span>
          </button>
        </div>
    )
}
export default AddTaskButton;