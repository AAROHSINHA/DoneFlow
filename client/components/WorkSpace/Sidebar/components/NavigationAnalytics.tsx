import React from 'react'
import { useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from "../icons.tsx";

function NavigationAnalytics() {
    const [expandedItems, setExpandedItems] = useState<string[]>([])
    const toggleExpanded = (item: string) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }
  return (
    <div>
              <div
                className="flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                onClick={() => toggleExpanded("analytics")}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Analytics</span>
                </div>
                {expandedItems.includes("analytics") ? <ChevronDownIcon /> : <ChevronRightIcon />}
              </div>
    
              {expandedItems.includes("analytics") && (
                <div className="ml-8 mt-2 mb-3 space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hours Focused</span>
                      <span className="text-sm font-semibold text-pink-600">+12%</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 mt-1">24.5h</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tasks Completed</span>
                      <span className="text-sm font-semibold text-pink-600">+8%</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 mt-1">47</div>
                  </div>
                </div>
              )}
            </div>
  )
}

export default NavigationAnalytics
