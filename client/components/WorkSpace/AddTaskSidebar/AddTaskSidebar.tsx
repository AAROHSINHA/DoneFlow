"use client"
import Header from "./components/Header.tsx";
import AddTaskButton from "./components/AddTaskButton.tsx";
import TitleField from "./components/TitleField.tsx";
import Tags from "./components/Tags.tsx";
import Priority from "./components/Priority.tsx";
import Timer from "./components/Timer.tsx";
import DeadLine from "./components/Deadline.tsx";
import { useState } from "react"
import {AddTaskContext} from "./components/AddTaskContext.ts";

interface AddTaskSidebarProps {
  isOpen: boolean
  onClose: () => void,
  setTaskReload: React.Dispatch<React.SetStateAction<boolean>>
  updateTags: boolean
  setUpdateStats: React.Dispatch<React.SetStateAction<boolean>>
  loggedIn: boolean
  email: string
}

export default function AddTaskSidebar({ isOpen, onClose, setTaskReload, updateTags, setUpdateStats, loggedIn, email }: AddTaskSidebarProps) {
  const [title, setTitle] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [timerTime, setTimerTime] = useState("")
  const [deadline, setDeadline] = useState("")
  const [reload, setReload] = useState(false);

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />}

      {/* Sidebar */}
      <AddTaskContext.Provider
      value={{
        title, setTitle,
        selectedTags, setSelectedTags,
        priority, setPriority,
        timerTime, setTimerTime,
        deadline, setDeadline,
        loggedIn, email
      }}
      >
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-4/5 md:w-2/5 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <Header onClose={onClose}/>
        {/* Form Content */}
        <div className="p-4 md:p-6 space-y-6 md:space-y-8 overflow-y-auto h-full pb-40">
          {/* Title Field -> Tags -> Priority -> Timer&Deadline */}
          <TitleField title={title} setTitle={setTitle} reload={reload} />
          <Tags selectedTags={selectedTags} setSelectedTags={setSelectedTags} updateTags={updateTags} reload={reload}/>
          <Priority priority={priority} setPriority={setPriority} reload={reload}/>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Timer timerTime={timerTime} setTimerTime={setTimerTime} reload={reload}/>
            <DeadLine deadline={deadline} setDeadline={setDeadline} reload={reload}/>
          </div>
        </div>

        {/* Add Button */}
        <AddTaskButton setTaskReload={setTaskReload} setReload={setReload} onClose={onClose} setUpdateStats={setUpdateStats} />
      </div>
        </AddTaskContext.Provider>
    </>
  )
}
