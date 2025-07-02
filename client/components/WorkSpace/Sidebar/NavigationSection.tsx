"use client"

import { useState } from "react"
import { ChevronDownIcon, ChevronRightIcon } from "./icons.tsx";

function NavigationSection() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const tags = [
    "#coding",
    "#university",
    "#work",
    "#personal",
    "#study",
    "#projects",
    "#meetings",
    "#research",
    "#design",
    "#development",
  ]

  return (
    <div className="flex-1 py-4">
      <nav className="space-y-1 px-4">
        {/* Dashboard */}
        <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
          <div className="w-5 h-5 mr-3">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
              />
            </svg>
          </div>
          <span className="font-medium">Dashboard</span>
        </div>

        {/* Tags */}
        <div>
          <div
            className="flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            onClick={() => toggleExpanded("tags")}
          >
            <div className="flex items-center">
              <div className="w-5 h-5 mr-3">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <span className="font-medium">Tags</span>
            </div>
            {expandedItems.includes("tags") ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </div>

          {expandedItems.includes("tags") && (
            <div className="ml-8 mt-2 mb-3">
              <div className="grid grid-cols-2 gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm cursor-pointer hover:bg-pink-100 transition-colors"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Analytics */}
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
      </nav>
    </div>
  )
}

export default NavigationSection;
