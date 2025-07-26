interface Props {
  tasksCompleted: number;
  totalTasks: number;
}

function NotStarted({ tasksCompleted, totalTasks }: Props) {
  const isZero = totalTasks === 0;
  const notStarted = isZero ? 0 : totalTasks - tasksCompleted;
  let percent = isZero ? 0 : (notStarted / totalTasks) * 100;
  percent = Math.max(Math.min(percent, 100), 0);
  const displayPercent = isZero ? '--' : `${percent.toFixed(1)}%`;

  return (
    <div className="flex flex-col justify-center flex-1 text-center w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700" style={{ letterSpacing: '3px' }}>
          Not Started
        </h3>
        <p className="text-sm font-semibold text-red-600" style={{ letterSpacing: '3px' }}>
          {displayPercent}
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-red-400 h-2 rounded-full"
          style={{ width: `${isZero ? '100' : percent.toFixed(1)}%` }}
        ></div>
      </div>
    </div>
  );
}

export default NotStarted;
