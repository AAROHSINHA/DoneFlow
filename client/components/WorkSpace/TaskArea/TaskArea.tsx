import { useEffect, useState } from "react";
import TaskBox from "../TaskBox/TaskBox";
import AddTask from "./AddTask.tsx";
import axios from "axios";

interface TaskInterface {
  title: string;
  tags: string[];
  priority?: string;
  progress?: number;
  estimateTime?: number;
  spendTime?: number;
  deadlineDate?: number;
  deadlineMonth?: number;
}

interface TaskAreaProp {
  taskReload: boolean
}

const colorKeys = ["teal", "red", "blue", "indigo", "emerald", "pink", "orange"]


const TaskArea:React.FC<TaskAreaProp> = ({taskReload}) => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  useEffect(() => {
    const getTasks = async () => {
      try{
        const res = await axios.get("http://localhost:5000/tasks/get-tasks",
          {withCredentials: true}
        )
        const importedTasks = res.data.tasks;
        const formattedTasks = importedTasks.map((task: any) => ({
        title: task.title,
        tags: task.tags,
        priority: task.priority ?? "low",
        progress: task.progress ?? 0,
        estimateTime: task.estimateTime ? task.estimateTime / 60 : 0,
        spendTime: task.spendTime ? task.spendTime / 60 : 0,
        deadlineDate: task.deadlineDate ?? 0,
        deadlineMonth: task.deadlineMonth ?? 0
      }));
      setTasks(formattedTasks);
      }catch(error){
        console.log("errorrrrr");
        console.log(error);
      }
    }

    getTasks();
  }, [taskReload])

  return (
    <div className="w-full flex justify-center  py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2.2em]">
        {tasks.map((task, index) => (
          
          <TaskBox
              key={index}
              color={colorKeys[index%colorKeys.length]}
              title={task.title}
              tags={task.tags}
              priority={task.priority}
              progress={task.progress}
              estimateTime={task.estimateTime}
              spendTime={task.spendTime}
              deadlineDate={task.deadlineDate}
              deadlineMonth={task.deadlineMonth}
  />
        ))}
        <AddTask />
      </div>
    </div>
  );
}
export default TaskArea;
