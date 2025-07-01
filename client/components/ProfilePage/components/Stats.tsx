import React from 'react'

function Stats() {
  return (
    <div className="space-y-4 mb-8">
            {/* Tasks Completed */}
            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Tasks Completed</span>
                <span className="text-xl font-bold text-pink-400">10/14</span>
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div className="bg-pink-400 h-2 rounded-full" style={{ width: '71%' }}></div>
              </div>
            </div>

            {/* Time Focused */}
            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Time Focused</span>
                <span className="text-xl font-bold text-pink-400">5h 42m</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">Today's focus time</div>
            </div>

            {/* Productivity Rate */}
            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Productivity Rate</span>
                <span className="text-xl font-bold text-pink-400">85%</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">Weekly average</div>
            </div>
          </div>
  )
}

export default Stats
