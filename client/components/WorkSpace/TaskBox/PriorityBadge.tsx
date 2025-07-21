import { Flag } from 'lucide-react';

interface PriorityProp {
  priorityName: string;
}

const PriorityBadge: React.FC<PriorityProp> = ({ priorityName }) => {
  let bgColor = "";

  if (priorityName === "high") {
    bgColor = "bg-red-200";
  } else if (priorityName === "medium") {
    bgColor = "bg-amber-200";
  } else if (priorityName === "low") {
    bgColor = "bg-green-200";
  } else {
    bgColor = "bg-gray-200"; // fallback for unknown priority
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-1 ${bgColor} text-white px-2 py-1 rounded-md text-xs font-medium`}
      >
        <Flag className="w-3 h-3" />
        {priorityName}
      </div>
    </div>
  );
};

export default PriorityBadge;
