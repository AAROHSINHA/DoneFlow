import Sidebar from "./Sidebar/Sidebar.tsx";
import WorkspaceNavbar from "./Navbar/WorkspaceNavbar.tsx";
import {SidebarContext} from "./SidebarContext.ts";
import { useState, useEffect } from "react";
import TaskArea from "./TaskArea/TaskArea.tsx";
import SearchBarArea from "./SearchBarArea/SearchBarArea.tsx"
import AddTaskSidebar from "./AddTaskSidebar/AddTaskSidebar.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";




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
    return (
        <div className="">
            <SidebarContext.Provider value={{ 
            isOpen: sidebarOpen,
            onClose: setSidebarOpen, 
            taskIsOpen: addTaskSidebarOpen,
            taskOnClose: setAddTaskSidebarOpen
            }}>
            <WorkspaceNavbar />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <AddTaskSidebar isOpen={addTaskSidebarOpen} onClose={() => setAddTaskSidebarOpen(false)}  setTaskReload={ setTaskReload}/>
            <SearchBarArea /> 
            <TaskArea taskReload={taskReload} />
        </SidebarContext.Provider>
    
        </div>
    )
}

export default WorkSpace;
