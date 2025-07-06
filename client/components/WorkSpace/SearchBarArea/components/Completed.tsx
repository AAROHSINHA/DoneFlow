import React from 'react';

interface Props {
  tasksCompleted: number;
  totalTasks: number;
}

function Completed({ tasksCompleted, totalTasks }: Props) {
  const isZero = totalTasks === 0;
  const percent = isZero ? 100 : (tasksCompleted / totalTasks) * 100;
  const displayPercent = isZero ? "--" : `${percent.toFixed(1)}%`;

  return (
    <div className="flex flex-col justify-center flex-1 text-center w-full">
      <div className="flex items-center justify-between mb-2">
        <h3
          className="text-[12px] font-medium text-gray-700"
          style={{ letterSpacing: "3px" }}
        >
          Completed
        </h3>
        <p
          className="text-sm font-semibold text-green-600"
          style={{ letterSpacing: "3px" }}
        >
          {displayPercent}
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-400 h-2 rounded-full"
          style={{ width: `${isZero ? "100" : percent.toFixed(1)}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Completed;
