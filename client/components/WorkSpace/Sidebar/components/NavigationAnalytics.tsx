import { useEffect, useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from "../icons.tsx";
import axios from 'axios';

function NavigationAnalytics() {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [loadAnalytics, setLoadAnalytics] = useState<boolean>(false);
    const [hoursFocused, setHoursFocused] = useState(0);
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const toggleExpanded = (item: string) => {
  setExpandedItems((prev) => {
    const isExpanded = prev.includes(item);

      if (!isExpanded) {
        setLoadAnalytics(prev => !prev);
        return [...prev, item];
      } else {
        return prev.filter((i) => i !== item);
      }
    });
  };

  useEffect(() => {
    const getNavigationAnalytics = async () => {
      try{
        const res = await axios.get("http://localhost:5000/stats/navigation-analytics", {
          withCredentials: true
        });
        setHoursFocused(res.data.hours);
        setTasksCompleted(res.data.tasks);
      }catch(error){
        alert("ERROR LOADING NAVIGATION ANALYTICS");
        console.log(error);
      }
    }
    getNavigationAnalytics();
  }, [loadAnalytics])

  return (
    <div>
              <div
                className="flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                onClick={() => toggleExpanded("analytics")}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Analytics</span>
                </div>
                {expandedItems.includes("analytics") ? <ChevronDownIcon /> : <ChevronRightIcon />}
              </div>
    
              {expandedItems.includes("analytics") && (
                <div className="ml-8 mt-2 mb-3 space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hours Focused</span>
                      <span className="text-sm font-semibold text-pink-600">+0%</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 mt-1">{Math.floor(hoursFocused/60)}h {(hoursFocused%60).toFixed(0)}m</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tasks Completed</span>
                      <span className="text-sm font-semibold text-pink-600">+0%</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 mt-1">{tasksCompleted}</div>
                  </div>
                </div>
              )}
            </div>
  )
}

export default NavigationAnalytics
