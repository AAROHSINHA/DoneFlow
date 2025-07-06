interface Props {
  tasksProgress: number
  totalTasks: number
}

function Progress({ tasksProgress, totalTasks }: Props) {
  const inProgress = tasksProgress;
  let percentage = totalTasks === 0 ? 100 : (inProgress / totalTasks) * 100;
  percentage = (percentage > 100) ? 100: percentage;
  const displayPercent = totalTasks === 0 ? '--' : `${percentage.toFixed(1)}%`;

  return (
    <div className="flex flex-col justify-center flex-1 text-center w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[12px] font-medium text-gray-700" style={{ letterSpacing: "3px" }}>
          In Progress
        </h3>
        <p className="text-sm font-semibold text-blue-600" style={{ letterSpacing: "3px" }}>
          {displayPercent}
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-400 h-2 rounded-full"
          style={{ width: `${totalTasks === 0 ? 100 : percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

export default Progress;
