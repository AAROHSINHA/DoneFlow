import { Check, Trash2 } from 'lucide-react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface ActionOptionsProps {
  taskIndex: number
  hidden: boolean
  title: string
  tags: string[]
  setTaskReload: React.Dispatch<React.SetStateAction<boolean>>
  handleMouseLeave: () => void,
  setUpdateTags: React.Dispatch<React.SetStateAction<boolean>>
  setUpdateStats: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskActionOptions: React.FC<ActionOptionsProps> = ({ taskIndex, hidden, title, tags, setTaskReload, handleMouseLeave, setUpdateTags, setUpdateStats }) => {
  const isLastColumn = (taskIndex + 1) % 4 === 0;
  if(hidden) return;
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

  const deleteTask = async () => {
    const email_id = await getEmail();
    try{
      const res = await axios.post("http://localhost:5000/tasks/delete-task", 
        {email: email_id, title: title, tags: tags},
        {withCredentials: true}
      )
      decrementTaskInStats(email_id);
    }catch(error) {
      alert("ERROR DELETING TASKS");
      console.log(error);
    }
    setUpdateTags(prev => !prev);
    setTaskReload(prev => !prev);
    setUpdateStats(prev => !prev);
    handleMouseLeave();
  }

  const decrementTaskInStats = async (email_id: string) => {
    try{
      await axios.patch("http://localhost:5000/stats/delete-task", 
        {email: email_id},
        {withCredentials: true}
      )
    }catch(error){
      console.log(error);
    }
  }

  const completeTask = async () => {
    const email_id = await getEmail();
    try{
      await axios.post("http://localhost:5000/tasks/delete-task", 
        {email: email_id, title: title, tags: tags},
        {withCredentials: true}
      )
      await axios.patch("http://localhost:5000/stats/complete-task", 
        {email: email_id, title: title},
        {withCredentials: true}
      )
    }catch(error){
      console.log(error);
    }
    setUpdateTags(prev => !prev);
    setTaskReload(prev => !prev);
    setUpdateStats(prev => !prev);
    handleMouseLeave();
  }

  return (
    <div
      className={`absolute ${isLastColumn ? 'right-full top-100' : 'left-full top-0'} z-50 flex flex-col gap-2 w-54 bg-white border border-pink-200 rounded-lg shadow-lg p-2`}
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
