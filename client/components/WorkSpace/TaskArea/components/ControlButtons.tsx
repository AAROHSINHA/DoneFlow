import { Play, Pause, Square } from 'lucide-react';
interface Props {
    isRunning: boolean
    isPaused: boolean
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
    setTime: React.Dispatch<React.SetStateAction<number>> 
}

function ControlButtons({isRunning, isPaused, setIsRunning, setIsPaused, setTime}: Props) {
  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
  };
  return (
    <div className="flex justify-center space-x-4">
          {!isRunning || isPaused ? (
            <button
              onClick={handleStart}
              className="flex items-center justify-center w-16 h-16 bg-pink-400 hover:bg-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-105"
            >
              <Play size={24} fill="white" />
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center justify-center w-16 h-16 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-105"
            >
              <Pause size={24} fill="white" />
            </button>
          )}

          <button
            onClick={handleStop}
            className="flex items-center justify-center w-16 h-16 bg-red-400 hover:bg-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-105"
          >
            <Square size={20} fill="white" />
          </button>
        </div>
  )
}

export default ControlButtons
