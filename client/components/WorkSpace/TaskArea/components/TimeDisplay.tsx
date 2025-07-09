import React from 'react'

interface Prop {
  time: number
  estimateTime: number
  spendTime: number
}

function TimeDisplay({ time, estimateTime, spendTime }: Prop) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatEstimateTime = (minutes: number) => {
    const totalSeconds = Math.floor(minutes * 60)
    const hours = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    if (estimateTime === 0) return 0
    return Math.min((time / (estimateTime * 60)) * 100, 100)
  }

  const getRemainingTime = () => {
    if (estimateTime === 0) return 0
    const estimateInSeconds = estimateTime * 60
    const remaining = estimateInSeconds - spendTime*60  - time
    return Math.max(remaining, 0)
  }

  const getOverTime = () => {
    if (estimateTime === 0) return 0
    const estimateInSeconds = estimateTime * 60
    const spendInSeconds = spendTime * 60
    const overTime = spendInSeconds - estimateInSeconds + time
    return Math.max(overTime, 0)
  }

  const isOvertime = getRemainingTime() === 0 && time >= 0

  return (
    <div className="text-center mb-8">
      <div className="text-6xl font-mono font-bold text-gray-800 mb-4">
        {formatTime(time)}
      </div>

      {/* Progress bar (only if not in overtime) */}
      {estimateTime > 0 && !isOvertime && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-pink-400 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      )}

      {/* Estimate and Remaining/Overtime display */}
      {estimateTime > 0 && (
        <div className="space-y-1">
          <div className="text-sm text-gray-500">
            Estimate: {formatEstimateTime(estimateTime)}
            {(getProgressPercentage() >= 100 || isOvertime) && (
              <span className="ml-2 text-pink-500 font-medium">✓ Complete!</span>
            )}
          </div>
          <div className="text-sm">
            {isOvertime ? (
              <div className="text-green-500">
                Overtime: {formatTime(getOverTime())}
                <span className="ml-2 text-orange-500 font-medium">⏰ Over time!</span>
              </div>
            ) : (
              <div className="text-red-500">
                Remaining: {formatTime(getRemainingTime())}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TimeDisplay
