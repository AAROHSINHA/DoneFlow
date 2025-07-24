import Sidebar from "./Sidebar/Sidebar.tsx";
import WorkspaceNavbar from "./Navbar/WorkspaceNavbar.tsx";
import {SidebarContext} from "./SidebarContext.ts";
import { useState, useEffect } from "react";
import TaskArea from "./TaskArea/TaskArea.tsx";
import SearchBarArea from "./SearchBarArea/SearchBarArea.tsx"
import AddTaskSidebar from "./AddTaskSidebar/AddTaskSidebar.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const WorkSpace = () => {
    const navigate = useNavigate();
    const [taskReload, setTaskReload] = useState(false); // to update workspace useeffect to show tasks on adding
    const [email, setEmail] = useState<string>("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState("");
    useEffect(() => {
        const checkLogin = async () => {
        try{
           const res = await axios.get("https://doneflow.onrender.com/users/check-login", {
            withCredentials: true,
          });
          // console.log(res.data);
          if(res.data.loggedIn){
            setEmail(res.data.user.email);
            setLoggedIn(true);
            setName(res.data.user.name);
          }else{
            setLoggedIn(false);
            toast.error("🔐 Please login first");
            navigate("/");
          }
         }catch(error){
            toast.error("Error Showing Workspace!");
            navigate("/");
         }
      }
      checkLogin();
    }, [])

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [addTaskSidebarOpen, setAddTaskSidebarOpen] = useState(false);
    const [overlay, setShowOverlay] = useState(false);
    const [updateTags, setUpdateTags] = useState(false);
    const [updateStats, setUpdateStats] = useState(false);
    return (
        <div className="">
            {overlay && <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
       
    /> }
            <SidebarContext.Provider value={{ 
            isOpen: sidebarOpen,
            onClose: setSidebarOpen, 
            taskIsOpen: addTaskSidebarOpen,
            taskOnClose: setAddTaskSidebarOpen,
            taskReload: taskReload,
            email: email,
            loggedIn: loggedIn,
            name: name
            }}>
            <WorkspaceNavbar />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} updateTags={updateTags} taskReload={taskReload} />
            <AddTaskSidebar isOpen={addTaskSidebarOpen} onClose={() => setAddTaskSidebarOpen(false)}  setTaskReload={ setTaskReload} updateTags={updateTags} setUpdateStats={setUpdateStats} loggedIn={loggedIn} email={email}  />
            <SearchBarArea updateStats={updateStats} /> 
            <TaskArea taskReload={taskReload} setTaskReload={setTaskReload} setShowOverlay={setShowOverlay} setUpdateTags={setUpdateTags} setUpdateStats={setUpdateStats}/>
        </SidebarContext.Provider>
    
        </div>
    )
}

export default WorkSpace;
