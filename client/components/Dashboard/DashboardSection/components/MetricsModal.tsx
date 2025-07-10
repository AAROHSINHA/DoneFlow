"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"

const metricsData = {
  "Task Statistics": [
    {
      title: "Total Tasks",
      definition: "Total number of tasks created overall.",
    },
    {
      title: "Tasks Completed",
      definition: "Number of tasks marked as finished.",
    },
    {
      title: "Tasks In Progress",
      definition: "Number of tasks currently being worked on.",
    },
    {
      title: "Tasks Remaining",
      definition: "Tasks not yet started or pending.",
    },
    {
      title: "Total Deleted",
      definition: "Number of tasks deleted from the system.",
    },
  ],
  "Performance Parameters": [
    {
      title: "Completion %",
      definition: "Percentage of total created tasks marked as complete.",
    },
    {
      title: "Efficiency %",
      definition: "How much of your estimated task time you actually spent in focused work.",
    },
    {
      title: "On-Time Completion %",
      definition: "Percentage of tasks finished by their assigned deadline.",
    },
    {
      title: "Hourly Focus %",
      definition: "Portion of each hour spent in focused, productive work.",
    },
    {
      title: "Daily Focus %",
      definition: "Portion of the whole day spent in focused work.",
    },
  ],
  "Focus Metrics": [
    {
      title: "Average Focus Time (min)",
      definition: "Average time spent in a focused work session.",
    },
    {
      title: "Longest Focus Session (min)",
      definition: "Duration of your longest uninterrupted focus session.",
    },
    {
      title: "Most Productive Period (start hour)",
      definition: "Hour of the day when you tend to be most productive.",
    },
    {
      title: "Least Productive Time (start hour)",
      definition: "Hour of the day when you are least productive.",
    },
    {
      title: "Active Days",
      definition: "Number of days you've logged activity or tracked work.",
    },
  ],
}

export default function MetricsModal() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 border border-pink-400 text-pink-400 hover:bg-pink-50 bg-transparent px-3 py-2 rounded hover:cursor-pointer"
      >
        <HelpCircle className="h-4 w-4" />
        Explain The Metrics
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white max-w-2xl max-h-[80vh] w-full overflow-y-auto rounded p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Metrics Explained
            </h2>
            <div className="space-y-6">
              {Object.entries(metricsData).map(([category, metrics], categoryIndex) => (
                <div key={category}>
                  <h3 className="text-lg font-medium text-pink-400 mb-3">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {metrics.map((metric) => (
                      <div
                        key={metric.title}
                        className="bg-gray-50 p-3 rounded-lg"
                      >
                        <h4 className="font-medium text-gray-900 mb-1">
                          {metric.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {metric.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                  {categoryIndex < Object.entries(metricsData).length - 1 && (
                    <hr className="mt-6 border-gray-200" />
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500 hover:cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
