import Barchart from "./components/Barchart.tsx";
import Profile from "./components/Profile.tsx";
import StatsContainer from "./components/StatsContainer.tsx";
import TodayQuickStats from "./components/TodayQuickStats.tsx";
import Percent from "./components/Percent.tsx";
import { useState } from "react";


export default function DashboardSection() {
  const [taskStats, ] = useState({
  "Tasks Completed": 127,
  "Tasks Pending": 23,
  "Tasks In Progress": 8,
  "Tasks Overdue": 3,
  "Total Tasks": 161
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
          <StatsContainer title="Task Statistics" stats={taskStats} />
          <StatsContainer title="Task Statistics" stats={taskStats} />
        </div>
      </div>
    </div>
  )
}
