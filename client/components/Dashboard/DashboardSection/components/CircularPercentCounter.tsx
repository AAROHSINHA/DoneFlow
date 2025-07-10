import React from 'react';

interface CircularPercentCounterProps {
  percentage: number;
  label?: string;
  size?: number;
  strokeWidth?: number;
}

const CircularPercentCounter: React.FC<CircularPercentCounterProps> = ({
  percentage,
  label = "Progress",
  size = 200,
  strokeWidth = 18
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className="relative" style={{ width: size * 2, height: size }}>
        <svg
          width={size * 2}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={(size * 2) / 2}
            cy={size / 2}
            r={radius}
            stroke="rgb(251 207 232)" // pink-200
            strokeWidth={strokeWidth}
            fill="transparent"
            className="opacity-30"
          />

          {/* Progress circle */}
          <circle
            cx={(size * 2) / 2}
            cy={size / 2}
            r={radius}
            stroke="rgb(244 114 182)" // pink-400
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(244, 114, 182, 0.3))'
            }}
          />
        </svg>

        {/* Percentage text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-pink-400">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>

      {/* Label below */}
      <p className="text-1xl tracking-[2px] font-medium text-pink-400 text-center">
        {label}
      </p>
    </div>
  );
};

export default CircularPercentCounter;
