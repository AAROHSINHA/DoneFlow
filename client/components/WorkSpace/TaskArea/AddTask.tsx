"use client"

import { Plus } from "lucide-react"
import { useContext } from "react"
import { SidebarContext } from "../SidebarContext"

export default function AddTask() {
    const sidebarContext  = useContext(SidebarContext);
  const handleAddTask = () => {
    // Add your task creation logic here
    sidebarContext?.taskOnClose(true);
    sidebarContext?.onClose(false);
  }

  return (
    <button
      onClick={handleAddTask}
      className="`w-105 h-105 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl shadow-lg hover:shadow-md transition-all duration-200 flex items-center justify-center group hover:cursor-pointer"
    >
      <Plus className="w-12 h-12 text-gray-400 group-hover:text-gray-600 group-hover:scale-110 transition-all duration-200" />
    </button>
  )
}
