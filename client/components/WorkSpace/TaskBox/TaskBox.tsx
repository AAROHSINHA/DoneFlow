import { Play, Clock, Calendar} from "lucide-react";
import Tag from "./Tag.tsx";
import TaskTitle from "./TaskTitle.tsx";
import PriorityBadge from "./PriorityBadge.tsx";
import ProgressBar from "./ProgressBar.tsx";
import Time from "./Time.tsx";
import Deadline from "./Deadline.tsx";

interface TaskBoxInterface {
  color: string;
  title: string;
  tags: string[];
  priority?: string;
  progress?: number;
  estimateTime?: number;
  spendTime?: number;
  deadlineDate?: number;
  deadlineMonth?: number;
}

const colorClasses: Record<string, string> = {
  teal: "from-teal-400 to-teal-600",
  red: "from-red-400 to-red-600",
  blue: "from-blue-400 to-blue-600",
  indigo: "from-indigo-400 to-indigo-600",
  emerald: "from-emerald-400 to-emerald-600",
  pink: "from-pink-400 to-pink-600",
  orange: "from-orange-400 to-orange-600"
};

const textColorClasses: Record<string, string> = {
  teal: "text-teal-600",
  red: "text-red-600",
  blue: "text-blue-600",
  indigo: "text-indigo-600",
  emerald: "text-emerald-600",
  pink: "text-pink-600",
  orange: "text-orange-600"
};


const TaskBox: React.FC<TaskBoxInterface> = ({
  color,
  title,
  tags,
  priority = "Low",
  progress = 0,
  estimateTime = 0,
  spendTime = 0,
  deadlineDate = 0,
  deadlineMonth = 0
}) => {
  const gradient = colorClasses[color] || "from-gray-400 to-gray-600";
  const textColor = textColorClasses[color] || "text-gray-700";

  return (
    <div className={`w-105 h-105 bg-gradient-to-br ${gradient} rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden mb-[3em] hover:cursor-pointer`}>
      {/* Status Indicator Dot */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>

      {/* Header Section */}
      <div className="space-y-4">
        <TaskTitle taskName={title} />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} />
          ))}
        </div>
        <PriorityBadge priorityName={priority} />
      </div>

      {/* Middle Section */}
      <div className="space-y-4">
        <ProgressBar percentage={progress} />
        <Time estimateTime={estimateTime} spentTime={spendTime} />
        <Deadline month={deadlineMonth} date={deadlineDate} />
      </div>

      {/* Footer - Start Button */}
      <button className={`w-full bg-white ${textColor} hover:bg-white/90 hover:scale-105 transition-all duration-200 font-bold py-4 rounded-xl border-0 shadow-lg flex items-center justify-center hover:cursor-pointer`}>
        <Play className="w-5 h-5 mr-2 fill-current" />
        Start Task
      </button>
    </div>
  );
};

export default TaskBox;