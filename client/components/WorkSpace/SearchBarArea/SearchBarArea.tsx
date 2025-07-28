import SearchBar from "./components/SearchBar.tsx";
import Completed from "./components/Completed.tsx";
import Progress from "./components/Progress.tsx";
import NotStarted from "./components/NotStarted.tsx";
import { useState, useEffect, useContext } from "react";
import { SidebarContext } from "../SidebarContext.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Sentry from "@sentry/react";

interface taskStatsInterface {
  tasksCompleted: number;
  totalTasks: number;
  tasksProgress: number;
}

interface Props {
  updateStats: boolean,
  setSearchBarLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchBarArea({updateStats, setSearchBarLoaded}: Props) {
  const navigate = useNavigate();
  const [taskStats, setTaskStats] = useState<taskStatsInterface>({
    tasksCompleted: 0,
    totalTasks: 0,
    tasksProgress: 0
  });
  const sidebarContext = useContext(SidebarContext);
  useEffect(() => {
    if (!sidebarContext?.email) return;
    const updateTaskStatsfn = async () => {
      try{
  
        const email_id = sidebarContext?.email;
        if (!email_id) {
          toast.error("User email not found. Please login again.");
          navigate("/");
          return;
        }
        const res = await axios.get("https://doneflow.onrender.com/stats/summary",{
            params: { email: email_id },
            withCredentials: true,
          });
        setTaskStats({
          tasksCompleted: res.data.tasksCompleted,
          totalTasks: res.data.totalTasks,
          tasksProgress: res.data.tasksProgress
        })
      }catch(error){
        Sentry.captureException(error);
        toast.error("Unable to load quick analytics...");
        setTaskStats({
          tasksCompleted: 0,
          totalTasks: 1,
          tasksProgress: 0
        })
      }
    }

    updateTaskStatsfn();
  }, [updateStats, sidebarContext?.email])

  return (
    <div className="px-6 md:px-12 lg:px-16 pb-7 bg-[#fdfdfd]">
      <div className="flex flex-col md:flex-row items-center gap-4 h-auto md:h-[10vh]  rounded-lg">
        <SearchBar />
        <div className="w-full md:flex-1 bg-[#fdfdfd] border border-gray-200 rounded-lg p-4 shadow-sm">
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
