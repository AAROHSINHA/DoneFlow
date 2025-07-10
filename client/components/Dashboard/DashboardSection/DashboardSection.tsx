import Barchart from "./components/Barchart.tsx";
import Profile from "./components/Profile.tsx";
import StatsContainer from "./components/StatsContainer.tsx";
import TodayQuickStats from "./components/TodayQuickStats.tsx";
import Percent from "./components/Percent.tsx";
import MetricsModal from "./components/MetricsModal.tsx";
import { useState, useEffect } from "react";
import axios from "axios";


export default function DashboardSection() {
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
    "Most Productive Period (start hour)": 0, // 3 PM
    "Least Productive Time (start hour)": 0,   // 2 AM
    "Active Days": 0
  });

  useEffect(() => {
    const getStats = async () => {
      try{
      const res = await axios.get("http://localhost:5000/stats/get-stats", {withCredentials: true});
      const data = res.data.body;
      setTaskStats({
        "Total Tasks": data.netTotalTasks | 0,
        "Tasks Completed": data.tasksCompleted | 0,
        "Tasks In Progress": data.startedTasks.length | 0,
        "Tasks Remaining": data.totalTasks - data.tasksCompleted | 0,
        "Total Deleted": data.netTotalTasks - data.TotalTasks | 0
      })
      const completion =
      data.netTotalTasks > 0
        ? Math.min(Math.round((data.tasksCompleted / data.netTotalTasks) * 100), 100)
        : 0;

      let efficiency = 0;
      if (data.focusSession > 0 && data.totalTime > 0) {
        const avgTimePerSession = data.timeSpend / data.focusSession;
        efficiency = Math.min(Math.round((avgTimePerSession / data.totalTime) * 100), 100);
      }

      const onTimeCompletion =
        data.tasksCompleted > 0
          ? Math.min(Math.round((data.onTimeCompletedTasks / data.tasksCompleted) * 100), 100)
          : 0;

      const hourlyFocus = () => {
        const hourly = data.focusPerHour;
        let netFocus = 0;
        let hoursFocused = 0;
        for(let hour of hourly){
          if(hour > 0){
            netFocus += hour;
            hoursFocused += 1;
          }
        }

        hoursFocused*=60;
        if(hoursFocused > 0){
          return Math.min(Math.round((netFocus / hoursFocused) * 100), 100);
        }
        return 0;
      }
      const dailyFocusPercent = () => {
        const daily = data.focusLastWeek;
        let daysFocused = 0;

        for (let day of daily) {
          if (day > 0) {
            daysFocused += 1;
          }
        }

        const percent = daysFocused > 0 
          ? ((daysFocused * 24) / (7 * 24)) * 100 
          : 0;

        return percent;
      };
      setPerformanceStats({
        "Completion %": completion,
        "Efficiency %": efficiency,
        "On-Time Completion %": onTimeCompletion,
        "Hourly Focus %": hourlyFocus(),
        "Daily Focus %": dailyFocusPercent()
      });

      setFocusMetrics({
        "Average Focus Time (min)": 0,
        "Longest Focus Session (min)": 0, // 2h 35m = 155 min
        "Most Productive Period (start hour)": 0, // 3 PM
        "Least Productive Time (start hour)": 0,   // 2 AM
        "Active Days": 0
      })


    
    }catch(error){
        alert("ERROR IN LOADING STATS");
        console.log(error);
      }
    }

    getStats();
  }, [])



  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <Profile />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        <Barchart />
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Today's Overview</h3>
            <Percent />
            <TodayQuickStats />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsContainer title="Task Statistics" stats={taskStats} />
          <StatsContainer title="Performance Parameters" stats={performanceStats} />
          <StatsContainer title="Focus Metrics" stats={focusMetrics} />
        </div>
        <MetricsModal />
      </div>
    </div>
  )
}
