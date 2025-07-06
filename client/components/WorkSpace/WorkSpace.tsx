import Sidebar from "./Sidebar/Sidebar.tsx";
import WorkspaceNavbar from "./Navbar/WorkspaceNavbar.tsx";
import {SidebarContext} from "./SidebarContext.ts";
import { useState, useEffect } from "react";
import TaskArea from "./TaskArea/TaskArea.tsx";
import SearchBarArea from "./SearchBarArea/SearchBarArea.tsx"
import AddTaskSidebar from "./AddTaskSidebar/AddTaskSidebar.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TaskActions from "./TaskBox/TaskActions.tsx";




const WorkSpace = () => {
    const navigate = useNavigate();
    const [taskReload, setTaskReload] = useState(false); // to update workspace useeffect to show tasks on adding
    useEffect(() => {
        const checkLogin = async () => {
        try{
           const res = await axios.get("http://localhost:5000/users/check-login", {
            withCredentials: true,
          });
          if(!res.data.loggedIn){
              navigate("/");
          }
         }catch(error){
              alert("Error Adding Task");
              console.log(error);
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
            taskOnClose: setAddTaskSidebarOpen
            }}>
            <WorkspaceNavbar />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} updateTags={updateTags} />
            <AddTaskSidebar isOpen={addTaskSidebarOpen} onClose={() => setAddTaskSidebarOpen(false)}  setTaskReload={ setTaskReload} updateTags={updateTags} setUpdateStats={setUpdateStats} />
            <SearchBarArea updateStats={updateStats} /> 
            <TaskArea taskReload={taskReload} setTaskReload={setTaskReload} setShowOverlay={setShowOverlay} setUpdateTags={setUpdateTags} setUpdateStats={setUpdateStats}/>
        </SidebarContext.Provider>
    
        </div>
    )
}

export default WorkSpace;
