import { Flag } from 'lucide-react';

interface PriorityProp {
  priorityName: string
}

const PriorityBadge: React.FC<PriorityProp> = ({ priorityName }) => {
  // Determine color based on priority
  const colorClasses = {
    high: "bg-red-200",
    medium: "bg-amber-200",
    low: "bg-green-200",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-1 ${colorClasses[priorityName]} text-white px-2 py-1 rounded-md text-xs font-medium`}
      >
        <Flag className="w-3 h-3" />
        {priorityName}
      </div>
    </div>
  );
};

export default PriorityBadge;
