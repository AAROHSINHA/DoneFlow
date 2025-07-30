import { Play } from "lucide-react";
import Tag from "./Tag.tsx";
import TaskTitle from "./TaskTitle.tsx";
import PriorityBadge from "./PriorityBadge.tsx";
import ProgressBar from "./ProgressBar.tsx";
import Time from "./Time.tsx";
import Deadline from "./Deadline.tsx";
import TaskActions from "./TaskActions.tsx";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useContext } from "react";
import { SidebarContext } from "../SidebarContext.ts";
import {toast} from "react-hot-toast";
import * as Sentry from "@sentry/react";

interface TaskBoxInterface {
  color: string;
  title: string;
  tags: string[];
  priority?: string;
  progress?: number;
  estimateTime?: number;
  spendTime?: number;
  deadlineDate?: number;
  deadlineMonth?: number;
  taskIndex: number
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>
  setTaskReload: React.Dispatch<React.SetStateAction<boolean>>
  setUpdateTags: React.Dispatch<React.SetStateAction<boolean>>
  setStopwatchModal: React.Dispatch<React.SetStateAction<boolean>>
  setTaskTitle:  React.Dispatch<React.SetStateAction<string>>
  setTaskEstimateTimer: React.Dispatch<React.SetStateAction<number>>
  setUpdateStats: React.Dispatch<React.SetStateAction<boolean>>
  setTaskSpendTime: React.Dispatch<React.SetStateAction<number>>
}

const colorClasses: Record<string, string> = {
  teal: "from-teal-400 to-teal-600",
  red: "from-red-400 to-red-600",
  blue: "from-blue-400 to-blue-600",
  indigo: "from-indigo-400 to-indigo-600",
  emerald: "from-emerald-400 to-emerald-600",
  pink: "from-pink-400 to-pink-600",
  orange: "from-orange-400 to-orange-600"
};

const textColorClasses: Record<string, string> = {
  teal: "text-teal-600",
  red: "text-red-600",
  blue: "text-blue-600",
  indigo: "text-indigo-600",
  emerald: "text-emerald-600",
  pink: "text-pink-600",
  orange: "text-orange-600"
};


const TaskBox: React.FC<TaskBoxInterface> = ({
  color,
  title,
  tags = [],
  priority = "Low",
  progress = 0,
  estimateTime = 0,
  spendTime = 0,
  deadlineDate = 0,
  deadlineMonth = 0,
  taskIndex,
  setShowOverlay,
  setTaskReload,
  setUpdateTags,
  setStopwatchModal,
  setTaskTitle,
  setTaskEstimateTimer,
  setUpdateStats,
  setTaskSpendTime
}) => {
  const gradient = colorClasses[color] || "from-gray-400 to-gray-600";
  const textColor = textColorClasses[color] || "text-gray-700";
  const [hidden, setHidden] = useState(true);
  const taskBoxRef = useRef<HTMLDivElement | null>(null); 

  const sidebarContext = useContext(SidebarContext);

  const getEmail = () => {
    if(sidebarContext?.loggedIn) return sidebarContext.email;
  }

  const handleTaskClick = () => {
    console.log({estimateTime, spendTime});
    setHidden(false);
    setShowOverlay(true); 
  }
  const handleMouseLeave = () => {
    setHidden(true);
    setShowOverlay(false);
  }

  const startTaskButton = async () => {
    setStopwatchModal(true);
    setTaskTitle(title);
    setTaskEstimateTimer(estimateTime*60);
    setTaskSpendTime(spendTime);
    try{
      const email = getEmail();
      await axios.post("https://doneflow.onrender.com/stats/start-progress", 
        {email: email, title: title},
        {withCredentials: true}
      )
    }catch(error){
      toast.error("Error Starting Task!");
      Sentry.captureException(error);
    }
  }

  useEffect(() => {
    const handleClickOutside = ((event: MouseEvent | TouchEvent) => {
      if(taskBoxRef && taskBoxRef.current && !taskBoxRef.current.contains(event?.target as Node)){
          setHidden(true);
          setShowOverlay(false);
        }
      });

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      }
    }, [])

  const completed = (spendTime*100)/(estimateTime*60) >= 100 ? 'shadow-[0_0_25px_rgba(34,197,94,0.8)]' : '';
  return (
    <div className="relative inline-block hover:cursor-pointer hover:z-50 transition transform duration-300" onClick={handleTaskClick} ref={taskBoxRef}>
    <div className={`w-full max-w-[26rem] h-full
 bg-gradient-to-br ${gradient} rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden mb-[3em] ${completed} ${!hidden ? "scale-110 z-50" : ""} transition-transform duration-200`}>
      {/* Status Indicator Dot */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>

      {/* Header Section */}
      <div className="space-y-4">
        <TaskTitle taskName={title} />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} />
          ))}
        </div>
        <PriorityBadge priorityName={priority} />
      </div>

      {/* Middle Section */}
      <div className="space-y-4">
        <ProgressBar percentage={(spendTime*100)/(estimateTime*60)} />
        <Time estimateTime={estimateTime} spentTime={spendTime} />
        <Deadline month={deadlineMonth} date={deadlineDate} />
      </div>

      {/* Footer - Start Button */}
      <button className={`w-full bg-white ${textColor} hover:bg-white/90 hover:scale-105 transition-all duration-200 font-bold py-4 rounded-xl border-0 shadow-lg flex items-center justify-center hover:cursor-pointer cursor:hover-pointer`}
      onClick={startTaskButton}
      >
        <Play className="w-5 h-5 mr-2 fill-current" />
        Start Task
      </button>
    </div>
        {!hidden && <TaskActions taskIndex={taskIndex} hidden={hidden} title={title} tags={tags} setTaskReload={setTaskReload} handleMouseLeave={handleMouseLeave} setUpdateTags={setUpdateTags}
        setUpdateStats={setUpdateStats} deadlineDate={deadlineDate} deadlineMonth={deadlineMonth} isLoggedIn={sidebarContext?.loggedIn} email={sidebarContext?.email} setShowOverlay={setShowOverlay}
        />}
        
    </div>
  );
};

export default TaskBox;