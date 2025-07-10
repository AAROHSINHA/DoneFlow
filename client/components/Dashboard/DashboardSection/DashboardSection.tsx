import Barchart from "./components/Barchart.tsx";
import Profile from "./components/Profile.tsx";
import StatsContainer from "./components/StatsContainer.tsx";
import TodayQuickStats from "./components/TodayQuickStats.tsx";
import Percent from "./components/Percent.tsx";
import { useState } from "react";


export default function DashboardSection() {
  const [taskStats, ] = useState({
  "Total Tasks": 127,
  "Tasks Completed": 23,
  "Tasks In Progress": 8,
  "Tasks Remaining": 3,
  "Total Deleted": 161
});
const [performanceStats, ] = useState({
  "Completion %": 18,
  "Efficiency %": 68,
  "On-Time Completion %": 72,
  "Hourly Focus %": 55,
  "Daily Focus %": 80
});
const [focusMetrics, ] = useState({
  "Average Focus Time (min)": 42,
  "Longest Focus Session (min)": 155, // 2h 35m = 155 min
  "Most Productive Period (start hour)": 15, // 3 PM
  "Least Productive Time (start hour)": 2,   // 2 AM
  "Active Days": 5
});

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
      </div>
    </div>
  )
}
