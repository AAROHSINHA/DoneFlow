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
    <div className="relative inline-block hover:cursor-pointer hover:z-50 transition transform duration-300 bg-purple-100 " onClick={handleAddTask}>
    <div className={`w-full max-w-[26rem] h-full
 bg-gradient-to-br rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden mb-[3em] transition-transform duration-200`}>

     <Plus className="w-12 h-12 text-gray-400 group-hover:text-gray-600 group-hover:scale-110 transition-all duration-200" />

 </div>
 </div>
  
 
  )
}
