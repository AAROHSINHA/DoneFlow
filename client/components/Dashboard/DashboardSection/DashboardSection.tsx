import Barchart from "./components/Barchart.tsx";
import Profile from "./components/Profile.tsx";
import StatsContainer from "./components/StatsContainer.tsx";
// import TodayQuickStats from "./components/TodayQuickStats.tsx";
// import Percent from "./components/Percent.tsx";
import MetricsModal from "./components/MetricsModal.tsx";
import MainStats from "./components/MainStats.tsx";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar.tsx";
import { calculateCompletion, calculateEfficiency, calculateOnTimeTaskCompletion, hourlyFocus, dailyFocusPercent, HOURS_IN_DAY, DAYS_IN_WEEK, averageFocusTime, productivePeriods } from "./helpers.ts";
import toast from "react-hot-toast";
import * as Sentry from "@sentry/react";

interface Prop {
  isOpen: boolean,
  onClose: () => void
}

export default function DashboardSection({isOpen, onClose}: Prop) {
  const [taskStats, setTaskStats] = useState({
    "Total Tasks": 0,
    "Tasks Completed": 0,
    "Tasks In Progress": 0,
    "Tasks Remaining": 0,
    "Total Deleted": 0
  });
  const [performanceStats, setPerformanceStats] = useState({
    "Completion %": 0,
    "Efficiency %": 0,
    "On-Time Completion %": 0,
    "Hourly Focus %": 0,
    "Daily Focus %": 0
  });
  const [focusMetrics, setFocusMetrics] = useState({
    "Average Focus Time (min)": 0,
    "Longest Focus Session (min)": 0, // 2h 35m = 155 min
    "Most Productive Period": 0, // 3 PM
    "Least Productive Time": 0,   // 2 AM
    "Total Hours Focused (h)": 0
  });
  const [hourlyData, setHourlyData] = useState<number[]>(Array(HOURS_IN_DAY).fill(0));
  const [weeklyData, setWeeklyData] = useState<number[]>(Array(DAYS_IN_WEEK).fill(0));

  const [mainStatsData, setMainStatsData] = useState({
    "timeSpend": 0,
    "totalTime": 0,
    "tasksCompleted": 0,
    "totalTasks": 0,
    "onTimeCompletedTasks": 0
  })
    
  useEffect(() => {
    const getStats = async () => {
      try{
      const res = await axios.get("http://localhost:5000/stats/get-stats", {withCredentials: true});
      const data = res.data.body;
      setTaskStats({
        "Total Tasks": data.netTotalTasks ?? 0,
        "Tasks Completed": data.tasksCompleted ?? 0,
        "Tasks In Progress": data.startedTasks?.length ?? 0,
        "Tasks Remaining": (data.totalTasks ?? 0) - (data.tasksCompleted ?? 0) - ((data.netTotalTasks ?? 0) - (data.totalTasks ?? 0)),
        "Total Deleted": (data.netTotalTasks ?? 0) - (data.totalTasks ?? 0)
      });
      setPerformanceStats({
        "Completion %": calculateCompletion(data.tasksCompleted, data.netTotalTasks),
        "Efficiency %": calculateEfficiency(data.timeSpend, data.totalTime),
        "On-Time Completion %": calculateOnTimeTaskCompletion(data.onTimeCompletedTasks, data.tasksCompleted),
        "Hourly Focus %": hourlyFocus(data.focusPerHour),
        "Daily Focus %": dailyFocusPercent(data.focusLastWeek)
      }); 
      const productiveHoursVals = productivePeriods(data.focusPhase);
      setFocusMetrics({
        "Average Focus Time (min)": averageFocusTime(data.timeSpend, data.focusSession),
        "Longest Focus Session (min)": data.longestFocusSession ?? 1,
        "Most Productive Period": productiveHoursVals.maxIndex,
        "Least Productive Time": productiveHoursVals.minIndex,
        "Total Hours Focused (h)": Number(((data.timeSpend ?? 0) / 60).toFixed(2)) 
      })
      setHourlyData(data.focusPerHour);
      setWeeklyData(data.focusLastWeek);
      setMainStatsData({
        "timeSpend": data.timeSpend ?? 1,
        "totalTime": data.totalTime ?? 1,
        "tasksCompleted": data.tasksCompleted ?? 0,
        "totalTasks": data.netTotalTasks ?? 1,
        "onTimeCompletedTasks": data.onTimeCompletedTasks ?? 0       
      })
    }catch(error){
        toast.error("Error Generating Stats! Sorry...");
        Sentry.captureException(error);
      }
    }

    getStats();
  }, [])



  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <Sidebar 
        isOpen={isOpen} 
        onClose={onClose} 
      />
        <Profile />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        <Barchart hourlyData={hourlyData} weeklyData={weeklyData} />
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <MainStats data={mainStatsData} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsContainer title="Task Statistics" stats={taskStats} which="task" taskStatstics={
            [taskStats["Total Tasks"], taskStats["Tasks In Progress"], taskStats["Tasks Remaining"]]}/>
          <StatsContainer title="Performance Parameters" stats={performanceStats} which="performance" efficiency={performanceStats["Efficiency %"]} />
          <StatsContainer title="Focus Metrics" stats={focusMetrics} which="focus"
          userFocus={[focusMetrics["Average Focus Time (min)"], focusMetrics["Longest Focus Session (min)"] , 
            Math.round(focusMetrics["Average Focus Time (min)"]/focusMetrics["Longest Focus Session (min)"])
          ]}
          />
        </div>
        <MetricsModal />
      </div>
    </div>
  )
}
