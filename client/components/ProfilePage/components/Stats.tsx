import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Sentry from "@sentry/react";
function Stats() {
  const [tasks, setTasks] = useState<number>(0);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [productivity, setProductivity] = useState<number>(0);
  const [spendTime, setSpendTime] = useState<number>(0);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  }
  useEffect(() => {
    const getNavigationAnalytics = async () => {
      try{
        const res = await axios.get("https://doneflow.onrender.com/stats/navigation-analytics", {
          withCredentials: true
        });
        setTasks(res.data.tasks);
        setTotalTasks(res.data.totalTasks);
        setSpendTime(res.data.spendTime);
        setProductivity(Math.round(
    (res.data.tasks / res.data.totalTasks) * (1 + (res.data.tasks / res.data.spendTime)) * 25
  ))
      }catch(error){
        Sentry.captureException(error);
        toast.error("Unable to load user-stats...");
      }
    }
    getNavigationAnalytics();
  }, [])
  return (
    <div className="space-y-5 mb-10">
      {/* Tasks Completed */}
      <div className="bg-gray-50 rounded-2xl p-5 hover:bg-gray-100 transition-colors duration-200 shadow-sm hover:cursor-pointer" onClick={handleClick}>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-semibold tracking-wide">Tasks Completed</span>
          <span className="text-lg font-bold text-pink-500">{tasks}/{totalTasks}</span>
        </div>
        <div className="mt-4 bg-gray-300 rounded-full h-2">
          <div className="bg-pink-500 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min((tasks / totalTasks) * 100, 100)}%` }}></div>
        </div>
      </div>

      {/* Time Focused */}
      <div className="bg-gray-50 rounded-2xl p-5 hover:bg-gray-100 transition-colors duration-200 shadow-sm hover:cursor-pointer" onClick={handleClick}>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-semibold tracking-wide">Time Focused</span>
          <span className="text-lg font-bold text-pink-500">{Math.round(spendTime/60)}h {spendTime%60}m</span>
        </div>
        <div className="mt-2 text-xs text-gray-500">Today's focus time</div>
      </div>

      {/* Productivity Rate */}
      <div className="bg-gray-50 rounded-2xl p-5 hover:bg-gray-100 transition-colors duration-200 shadow-sm hover:cursor-pointer" onClick={handleClick}>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-semibold tracking-wide">Productivity Rate</span>
          <span className="text-lg font-bold text-pink-500">{productivity ? productivity : 0}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500">Weekly average</div>
      </div>
    </div>
  );
}

export default Stats;
