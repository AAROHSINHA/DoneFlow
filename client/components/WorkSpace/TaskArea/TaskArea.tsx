import { useEffect, useState, useMemo } from "react";
import TaskBox from "../TaskBox/TaskBox";
import AddTask from "./AddTask.tsx";
import axios from "axios";
import StopwatchModal from "./StopWatchModal.tsx";
import toast from "react-hot-toast";

interface TaskInterface {
  title: string;
  tags: string[];
  priority?: string;
  progress?: number;
  estimateTime?: number;
  spendTime: number;
  deadlineDate?: number;
  deadlineMonth?: number;
}

interface TaskAreaProp {
  taskReload: boolean
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>
  setTaskReload: React.Dispatch<React.SetStateAction<boolean>>
  setUpdateTags: React.Dispatch<React.SetStateAction<boolean>>
  setUpdateStats: React.Dispatch<React.SetStateAction<boolean>>
}

let colorKeys = ["teal", "red", "blue", "indigo", "emerald", "pink", "orange"]


const TaskArea:React.FC<TaskAreaProp> = ({taskReload, setShowOverlay, setTaskReload, setUpdateTags, setUpdateStats}) => {
  const [stopwatchModal, setStopwatchModal] = useState(false);
  const [taskEstimateTime, setTaskEstimateTime] = useState<number>(0);
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [taskSpendTime, setTaskSpendTime] = useState<number>(0);
  const shuffleArray = (arr: string[]) => {
  const array = [...arr]; // Copy to avoid mutating the original
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
      return array;
  };
  const shuffledColors = useMemo(() => shuffleArray(colorKeys), []);
  useEffect(() => {
    const getTasks = async () => {
      try{
        const res = await axios.get("https://doneflow.onrender.com/tasks/get-tasks",
          {withCredentials: true}
        )
        const importedTasks = res.data.tasks;
        const formattedTasks = importedTasks.map((task: any) => ({
        title: task.title,
        tags: task.tags,
        priority: task.priority ?? "low",
        progress: task.progress ?? 0,
        estimateTime: task.estimateTime ? task.estimateTime / 60 : 0,
        spendTime: task.spendTime ? task.spendTime: 0, // this is in minutes
        deadlineDate: task.deadlineDate ?? 0,
        deadlineMonth: task.deadlineMonth ?? 0
      }));
      setTasks(formattedTasks);
      }catch(error){
        toast.error("Error Loading Tasks");
      }
    }

    getTasks();
  }, [taskReload])

  return (
    <div className="w-full flex justify-center  py-4 bg-[#fdfdfd]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2.2em]">
        {tasks.map((task, index) => (
          
          <TaskBox
              key={index}
              color={shuffledColors[index%shuffledColors.length]}
              title={task.title}
              tags={task.tags}
              priority={task.priority}
              progress={task.progress}
              estimateTime={task.estimateTime}
              spendTime={task.spendTime}
              deadlineDate={task.deadlineDate}
              deadlineMonth={task.deadlineMonth}
              taskIndex={index}
              setShowOverlay={setShowOverlay}
              setTaskReload={setTaskReload}
              setUpdateTags={setUpdateTags}
              setStopwatchModal={setStopwatchModal}
              setTaskTitle={setTaskTitle}
              setTaskEstimateTimer={setTaskEstimateTime}
              setUpdateStats={setUpdateStats}
              setTaskSpendTime={setTaskSpendTime}
  />
        ))}
        <AddTask />
      </div>
      <StopwatchModal taskTitle={taskTitle} isOpen={stopwatchModal} onClose={() => setStopwatchModal(false)} estimateTime={taskEstimateTime} setTaskReload={setTaskReload} spendTime={taskSpendTime} randomIndex = {Math.floor(Math.random()*5)} />
    </div>
  );
}
export default TaskArea;
