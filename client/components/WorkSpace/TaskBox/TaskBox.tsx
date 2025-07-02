import { Play, Clock, Calendar} from "lucide-react";
import Tag from "./Tag.tsx";
import TaskTitle from "./TaskTitle.tsx";
import PriorityBadge from "./PriorityBadge.tsx";
import ProgressBar from "./ProgressBar.tsx";
import Time from "./Time.tsx";
import Deadline from "./Deadline.tsx";

interface TaskBoxInterface {
  color: String
}



const TaskBox:React.FC<TaskBoxInterface> = ({color}) => {
  return (
    <div className={`w-100 h-100 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden`}>
      {/* Status Indicator Dot */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-yello-400 rounded-full border-2 border-white hover:cursor-pointer"></div>
      {/* Header Section */}
      <div className="space-y-4">
        {/* Task Title */}
        <TaskTitle taskName={"Complete WebDev Course"} />
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Tag tagName={"Coding"} />
        </div>
        {/* Priority Badge */}
        <PriorityBadge priorityName="High"/>
      </div>

      {/* Middle Section */}
      <div className="space-y-4">
        {/* Progress Bar */}
        <ProgressBar percentage={50} />
        {/* Time Information */}
        <Time estimateTime={3} spentTime={1.2}/>
        {/* Deadline */}
        <Deadline month={"Aug"} date={15}/>
      </div>

      {/* Footer - Start Button */}
      <button className={`w-full bg-white text-${color}-600 hover:bg-white/90 hover:scale-105 transition-all duration-200 font-bold py-4 rounded-xl border-0 shadow-lg flex items-center justify-center hover:cursor-pointer`}>
        <Play className="w-5 h-5 mr-2 fill-current" />
        Start Task
      </button>
    </div>
  )
}
export default TaskBox;