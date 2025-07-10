interface ProgressProp {
  percentage: number;
}

const ProgressBar: React.FC<ProgressProp> = ({ percentage }) => {
  const cappedPercentage = Math.min(percentage, 100);
  const isComplete = cappedPercentage === 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white/80 text-sm font-medium">Progress</span>
        <span className="text-white font-semibold text-sm">{cappedPercentage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ease-out ${
            isComplete ? 'bg-green-400' : 'bg-white'
          }`}
          style={{ width: `${cappedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
