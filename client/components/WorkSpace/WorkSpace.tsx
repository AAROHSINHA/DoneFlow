import Sidebar from "./Sidebar/Sidebar.tsx";
import WorkspaceNavbar from "./Navbar/WorkspaceNavbar.tsx";
import {SidebarContext} from "./SidebarContext.ts";
import { useState } from "react";
import TaskArea from "./TaskArea/TaskArea.tsx";
// import SearchBarArea from "./SearchBarArea/SearchBarArea.tsx"




const WorkSpace = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="">
            <SidebarContext.Provider value={{ 
            isOpen: sidebarOpen,
            onClose: setSidebarOpen 
            }}>
            <WorkspaceNavbar />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </SidebarContext.Provider>
            {/* <SearchBarArea /> */}
            <TaskArea />
        </div>
    )
}

export default WorkSpace;
