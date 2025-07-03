import React from 'react';
import { useContext } from 'react';
import { SidebarContext } from '../../SidebarContext';

function AddTasksSidebar() {
  const sidebarContext = useContext(SidebarContext);
  const handleClick = () => {
    sidebarContext?.onClose(false);
    sidebarContext?.taskOnClose(true);
  }
  return (
    <div className="flex items-center px-3 py-2 text-green-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors" onClick={handleClick}>
      <div className="w-5 h-5 mr-3">
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <span className="font-medium">Add Task</span>  
    </div>
  );
}

export default AddTasksSidebar;
