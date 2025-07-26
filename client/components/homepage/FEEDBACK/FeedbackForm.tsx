"use client"

import axios from "axios"
import type React from "react"
import { useState } from "react"
import { useContext } from "react"
import { LoginContext } from "../Context"
import toast from "react-hot-toast"

export default function FeedbackForm() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [feedbackText, setFeedbackText] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const loginContext = useContext(LoginContext);
  const [titleMessage, setTitleMessage] = useState("");
  const [descMessage, setDescMessage] = useState("");

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating)
  }

  const sendFeedback = async (feedback: string, rating: number | null)  => {
    setTitleMessage("Sending your feedback...");
    setTitleMessage("Just a moment, we’re submitting your feedback.");

    try{
      await axios.post("https://doneflow.onrender.com/send-feedback", {
        email: loginContext?.email || "",
        feedback: feedback,
        rating: rating
      }, {
        withCredentials: true
      })
      setTitleMessage("Thank You for Your Feedback!");
      setDescMessage("Your input helps us improve our service.");
      toast.success("Feedback sent succesfully");
    }catch(error){
      setTitleMessage("Well, that didn’t work...");
      setDescMessage("We failed to send your feedback. We're as disappointed as you are.");
      toast.error("Unable to send feedback! Try again later...")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    sendFeedback(feedbackText, selectedRating);
    setIsSubmitted(true)
    // Reset form after a short delay or navigate
    setTimeout(() => {
      setSelectedRating(null)
      setFeedbackText("")
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <div className="font-['Inter'] flex items-center justify-center min-h-screen bg-[#fdfdfd] p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl w-full">
        {isSubmitted ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">{titleMessage}</h2>
            <p className="text-gray-700">{descMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-pink-400">Rate your experience</h2>
            </div>

            {/* Main Content: Rating on Left, Textbox on Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Rating Section (Left Column) */}
              <div className="space-y-6">
                <p className="text-gray-700 text-lg font-medium">
                  How likely are you to recommend our service to a friend or colleague?
                </p>
                <div className="grid grid-cols-5 gap-3 justify-items-center">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingClick(rating)}
                      className={`
                        flex items-center justify-center hover:cusror-pointer  h-12 w-12 rounded-full text-lg font-semibold
                        transition-all duration-200 ease-in-out
                        ${
                          selectedRating === rating
                            ? "bg-pink-400 text-white shadow-md"
                            : "border-2 border-pink-400 text-pink-600 hover:bg-pink-50 hover:border-pink-500"
                        }
                        focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                      `}
                      aria-pressed={selectedRating === rating}
                      aria-label={`Rate ${rating}`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>0 - Extremely Unlikely</span>
                  <span>10 - Extremely Likely</span>
                </div>
              </div>

              {/* Feedback Textarea Section (Right Column) */}
              <div className="space-y-6">
                <p className="text-gray-700 text-lg font-medium">What is the main reason for the score?</p>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Your feedback is valuable to us"
                  rows={8}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 ease-in-out resize-y text-gray-800 placeholder-gray-400"
                  aria-label="Main reason for the score"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-pink-400 hover:cursor-pointer text-white font-semibold py-3 px-8 rounded-lg shadow-md
                  hover:bg-pink-500 transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                  disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={selectedRating === null} // Disable if no rating is selected
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
