import { createContext } from "react";
export interface AddTaskInterface {
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    selectedTags: string[],
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>,
    priority: "low" | "medium" | "high",
    setPriority: React.Dispatch<React.SetStateAction<"low" | "medium" | "high">>,
    timerTime: string,
    setTimerTime: React.Dispatch<React.SetStateAction<string>>,
    deadline: string, 
    setDeadline: React.Dispatch<React.SetStateAction<string>>
}

export const AddTaskContext = createContext<AddTaskInterface | null>(null);
