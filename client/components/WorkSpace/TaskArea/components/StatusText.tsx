
interface Prop {
    isRunning: boolean
    isPaused: boolean
    time: number
}

function StatusText({isRunning, isPaused, time}: Prop) {
      const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  return (
    <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            {isRunning && !isPaused && "Timer is running..."}
            {isPaused && "Timer paused"}
            {!isRunning && time === 0 && "Ready to start"}
            {!isRunning && time > 0 && `Completed in ${formatTime(time)}`}
          </p>
        </div>
  )
}

export default StatusText
