import Barchart from "./components/Barchart.tsx";
import Profile from "./components/Profile.tsx";
import StatsContainer from "./components/StatsContainer.tsx";
import TodayQuickStats from "./components/TodayQuickStats.tsx";
import Percent from "./components/Percent.tsx";
import MetricsModal from "./components/MetricsModal.tsx";
import MainStats from "./components/MainStats.tsx";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar.tsx";

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
    "Most Productive Period (start hour)": 0, // 3 PM
    "Least Productive Time (start hour)": 0,   // 2 AM
    "Total Hours Focused": 0
  });
  const [hourlyData, setHourlyData] = useState<number[]>(Array(24).fill(0));
  const [weeklyData, setWeeklyData] = useState<number[]>(Array(7).fill(0));

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

        return Math.round(percent);
      };
      setPerformanceStats({
        "Completion %": completion,
        "Efficiency %": efficiency,
        "On-Time Completion %": onTimeCompletion,
        "Hourly Focus %": hourlyFocus(),
        "Daily Focus %": dailyFocusPercent()
      });

      const averageFocusTime = () => {
        const spendTime = data.timeSpend ?? 0;
        const focusSession = data.focusSession ?? 0;
        return (focusSession > 0) ? Number((spendTime/focusSession).toFixed(2)) : 0
      }

      const productivePeriods = () => {
        const hourlyData = data.focusPhase;
        let maxIndex = -1;
        let minIndex = -1;
        let maxHours = 0;
        let minHours = 3;
        for(let i = 0; i < hourlyData.length; i++){
          const hours = hourlyData[i];
          if(hours >= maxHours){
            maxIndex = i;
            maxHours = hours;
          }
          if(hours <= minHours){
            minIndex = hours;
            minHours = hours;
          }
        }
        return {minIndex, maxIndex};
      }
      const productiveHoursVals = productivePeriods();

      setFocusMetrics({
        "Average Focus Time (min)": averageFocusTime(),
        "Longest Focus Session (min)": data.longestFocusSession ?? 1,
        "Most Productive Period (start hour)": productiveHoursVals.maxIndex,
        "Least Productive Time (start hour)": productiveHoursVals.minIndex,
        "Total Hours Focused": Math.round(data.timeSpend ?? 0 / 60) 
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
        alert("ERROR IN LOADING STATS");
        console.log(error);
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
        <Barchart hourlyData={Array.from({ length: 24 }, () => Math.floor(Math.random() * 61))} weeklyData={weeklyData} />
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
