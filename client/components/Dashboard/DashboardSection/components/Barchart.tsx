import HourlyChart from "./HourlyChart";
import { useEffect, useState } from "react";

const Hourlylabels = [
  "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM",
  "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
  "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
  "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
];

interface BarchartProps {
  hourlyData: number[],
  weeklyData: number[],
}


const Barchart = ({hourlyData, weeklyData}: BarchartProps) => {
    const [toggle, setToggle] = useState(true);
    const [Weeklylabels, setWeeklyLabels] = useState<string[]>([]);
    useEffect(() => {
      const getLast7Days = () => {
    const days: string[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i - 1);

      const formatted = date.toLocaleDateString("en-US", {
        weekday: "short", // Mon, Tue, etc.
        month: "short",   // Jul, Aug, etc.
        day: "numeric"    // 11, 12, etc.
      });

      days.push(formatted);
      
    }
    console.log(weeklyData);
    console.log(days);
    console.log(weeklyData.length == days.length);
    return days;
  };
  setWeeklyLabels(getLast7Days());
   }, [])
    return (
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">Progress Analytics</h3>
                <p className="text-gray-500 mt-1">Track your productivity over time</p>
              </div>

              {/* Toggle Button for Hourly/Weekly */}
              <div className="flex bg-gray-100 rounded-lg p-1 ">
              <button
                onClick={() => setToggle(true)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover:cursor-pointer ${
                  toggle ? "bg-pink-400 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Hourly
              </button>
              <button
                onClick={() => setToggle(false)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover:cursor-pointer ${
                  !toggle ? "bg-pink-400 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Weekly
              </button>
            </div>

            </div>

            {/* Large Bar Chart Placeholder */}
           <div className="h-120 bg-white rounded-lg p-4 shadow">
              {toggle ? <HourlyChart data={hourlyData} labels={Hourlylabels} label="Today" /> :
              <HourlyChart data={weeklyData} labels={Weeklylabels} label="Last 7 Days" />}

            </div>

          </div>
    )
}

export default Barchart;
