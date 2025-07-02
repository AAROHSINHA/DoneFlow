interface ProgressProp {
    percentage: number
}

const ProgressBar:React.FC<ProgressProp> = ({percentage}) => {
    return (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-sm font-medium">Progress</span>
            <span className="text-white font-semibold text-sm">{percentage.toString()}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: `${percentage.toString()}%` }}></div>
          </div>
        </div>
    )
}

export default ProgressBar;
