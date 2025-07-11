import DoughnutStats from "./DoughnutStats";
import BarStats from "./BarStats";
import CircularPercentCounter from "./CircularPercentCounter";

interface StatsContainerProp {
  which: string
  title: string;
  stats: { [key: string]: number };
  taskStatstics?: number[],
  efficiency?: number,
  userFocus?: number[]
}

const TIME_RANGES = [
  "12AM–3 AM", "3AM–6 AM", "6AM–9 AM", "9 AM–12 PM",
  "12PM–3 PM", "3PM–6 PM", "6PM–9 PM", "9 PM–12 AM"
];


const StatsContainer = ({ title, stats, which, efficiency, taskStatstics, userFocus }: StatsContainerProp) => {
  const percentageTag = (title == "Performance Parameters") ? "%" : "";
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
        {title}
      </h4>
      <div className="space-y-3 mb-4">
        {Object.entries(stats).map(([key, value]) => {
        let displayValue: string | number = value;

        if (
          key === "Most Productive Period (start hour)" ||
          key === "Least Productive Time (start hour)"
        ) {
          displayValue = TIME_RANGES[value as number] ?? "N/A";
        }

        return (
          <div className="flex justify-between items-center" key={key}>
            <span className="text-gray-600">{key}</span>
            <span className="font-medium text-gray-900">
              {displayValue}{percentageTag}
            </span>
          </div>
        );
      })}

      </div>
      {/* Placeholder for Pie Chart */}
      <div className="w-full h-80 bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center rounded">
        <span className="text-gray-400">
            {which == "task" ? <DoughnutStats data={taskStatstics??[1, 1, 1]}/> 
            : (which == "performance" ? <CircularPercentCounter percentage={efficiency ?? 0}/>
                : <BarStats userFocus={userFocus ?? [50, 50, 50]} targetFocus={[50, 120, 50]}/>
            )    
        }
        </span>
      </div>
    </div>
  );
};

export default StatsContainer;
