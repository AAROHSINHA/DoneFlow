import SearchBar from "./components/SearchBar.tsx";
import Completed from "./components/Completed.tsx";
import Progress from "./components/Progress.tsx";
import NotStarted from "./components/NotStarted.tsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface taskStatsInterface {
  tasksCompleted: number;
  totalTasks: number;
  tasksProgress: number;
}

interface Props {
  updateStats: boolean
}

export default function SearchBarArea({updateStats}: Props) {
  const navigate = useNavigate();
  const [taskStats, setTaskStats] = useState<taskStatsInterface>({
    tasksCompleted: 0,
    totalTasks: 0,
    tasksProgress: 0
  });
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

  useEffect(() => {
    const updateTaskStatsfn = async () => {
      try{
        const email_id = await getEmail();
        const res = await axios.get("http://localhost:5000/stats/summary",{
            params: { email: email_id },
            withCredentials: true,
          });
        setTaskStats({
          tasksCompleted: res.data.tasksCompleted,
          totalTasks: res.data.totalTasks,
          tasksProgress: res.data.tasksProgress
        })
      }catch(error){
        alert("error getting stats for searchbar area");
        console.log(error);
      }
    }

    updateTaskStatsfn();
  }, [updateStats])

  return (
    <div className="px-6 md:px-12 lg:px-16 pb-7">
      <div className="flex flex-col md:flex-row items-center gap-4 h-auto md:h-[10vh]  rounded-lg">
        <SearchBar />
        <div className="w-full md:flex-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between h-full gap-6">
            <Completed tasksCompleted={taskStats?.tasksCompleted} totalTasks={taskStats?.totalTasks} />
            <Progress tasksProgress={taskStats?.tasksProgress} totalTasks={taskStats?.totalTasks}/>
            <NotStarted tasksCompleted={taskStats?.tasksCompleted} totalTasks={taskStats?.totalTasks} />
          </div>
        </div>
      </div>
    </div>
  )
}
