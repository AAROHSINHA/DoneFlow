"use client"

import { useState } from "react"
import { X, Camera, Video } from "lucide-react"

export default function Feedback() {
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")
  const [feedbackCategory, setFeedbackCategory] = useState("")

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Rate your experience</h2>
          <button className="h-6 w-6 p-0 hover:bg-gray-100 rounded-full flex items-center justify-center">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Question + Score */}
        <div className="space-y-4 mb-6">
          <p className="text-sm text-gray-700">
            How likely are you to recommend our service to a friend or colleague?
          </p>

          <div className="space-y-3">
            {/* First row: 0-5 */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => setSelectedScore(score)}
                  className={`w-10 h-10 rounded-full border-2 text-sm font-medium transition-all ${
                    selectedScore === score
                      ? "bg-pink-400 border-pink-400 text-white"
                      : "border-gray-300 text-gray-700 hover:border-pink-300 hover:text-pink-500"
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>

            {/* Second row: 6-10 */}
            <div className="flex justify-center gap-2">
              {[6, 7, 8, 9, 10].map((score) => (
                <button
                  key={score}
                  onClick={() => setSelectedScore(score)}
                  className={`w-10 h-10 rounded-full border-2 text-sm font-medium transition-all ${
                    selectedScore === score
                      ? "bg-pink-400 border-pink-400 text-white"
                      : "border-gray-300 text-gray-700 hover:border-pink-300 hover:text-pink-500"
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>

            {/* Labels */}
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>0 - Extremely Unlikely</span>
              <span>10 - Extremely Likely</span>
            </div>
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2 mb-6">
          <p className="text-sm font-medium text-gray-900">What aspect would you like to give feedback on?</p>
          <select
            className="w-full border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={feedbackCategory}
            onChange={(e) => setFeedbackCategory(e.target.value)}
          >
            <option value="">Select a category (optional)</option>
            <option value="overall">Overall Experience</option>
            <option value="usability">Ease of Use</option>
            <option value="performance">Speed & Performance</option>
            <option value="design">Design & Interface</option>
            <option value="features">Features & Functionality</option>
            <option value="support">Customer Support</option>
            <option value="pricing">Pricing & Value</option>
            <option value="reliability">Reliability</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Feedback Textarea */}
        <div className="space-y-2 mb-6">
          <p className="text-sm font-medium text-gray-900">What is the main reason for the score?</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback is valuable to us"
            className="w-full min-h-[80px] p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <button className="h-8 w-8 p-0 border border-gray-300 rounded-md bg-transparent hover:bg-pink-50 flex items-center justify-center">
              <Camera className="h-4 w-4 text-gray-600" />
            </button>
            <button className="h-8 w-8 p-0 border border-gray-300 rounded-md bg-transparent hover:bg-pink-50 flex items-center justify-center">
              <Video className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          <button
            disabled={selectedScore === null}
            className={`px-6 py-2 rounded-md text-white text-sm font-medium ${
              selectedScore === null
                ? "bg-pink-200 cursor-not-allowed"
                : "bg-pink-400 hover:bg-pink-500"
            }`}
          >
            Submit
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-400">
            Powered by <span className="font-medium">usersnap</span>
          </p>
        </div>
      </div>
    </div>
  )
}
