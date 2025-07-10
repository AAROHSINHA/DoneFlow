import DoughnutStats from "./DoughnutStats";
import BarStats from "./BarStats";
import CircularPercentCounter from "./CircularPercentCounter";

interface StatsContainerProp {
  title: string;
  stats: { [key: string]: number };
}

const StatsContainer = ({ title, stats }: StatsContainerProp) => {
  const percentageTag = (title == "Performance Parameters") ? "%" : "";
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
        {title}
      </h4>
      <div className="space-y-3 mb-4">
        {Object.entries(stats).map(([key, value]) => (
          <div className="flex justify-between items-center" key={key}>
            <span className="text-gray-600">{key}</span>
            <span className="font-medium text-gray-900">{value}{percentageTag}</span>
          </div>
        ))}
      </div>
      {/* Placeholder for Pie Chart */}
      <div className="w-full h-80 bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center rounded">
        <span className="text-gray-400">
            {title == "Task Statistics" ? <DoughnutStats data={[25, 25, 50]}/> 
            : (title == "Performance Parameters" ? <CircularPercentCounter percentage={45}/>
                : <BarStats userFocus={[50, 50, 50]} targetFocus={[70, 30, 70]}/>
            )    
        }
        </span>
      </div>
    </div>
  );
};

export default StatsContainer;
