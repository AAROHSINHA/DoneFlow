import { Clock } from "lucide-react";

interface TimeProp {
  estimateTime: number;
  spentTime: number;
}

const Time: React.FC<TimeProp> = ({ estimateTime, spentTime }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white/10 rounded-lg p-2">
        <div className="flex items-center gap-1 mb-1">
          <Clock className="w-3 h-3 text-white/70" />
          <span className="text-white/70 text-xs">Estimate</span>
        </div>
        <span className="text-white font-semibold text-sm">
          {estimateTime !== 0 ? estimateTime.toFixed(1) + "h" : "--"}
        </span>
      </div>
      <div className="bg-white/10 rounded-lg p-2">
        <div className="flex items-center gap-1 mb-1">
          <Clock className="w-3 h-3 text-white/70" />
          <span className="text-white/70 text-xs">Spent</span>
        </div>
        <span className="text-white font-semibold text-sm">
          {spentTime !== 0 ? spentTime.toFixed(1) + "h" : "--"}
        </span>
      </div>
    </div>
  );
};

export default Time;
