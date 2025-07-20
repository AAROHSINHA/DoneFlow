import { Link } from 'react-router-dom';
import React from 'react';
import { Home, LogOut, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DashboardContext } from '../DashboardContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {

     const navigate = useNavigate();
    const dashboardContext = useContext(DashboardContext);

  const handleLogout = async () => {
    try{
        await axios.post(
            "http://localhost:5000/users/logout",
            null, // no body
            { withCredentials: true }
            );
        navigate("/");
    }catch(error){
        console.log(error);
        alert("ERROR LOGGING OUT");
    }
  };
  return (
    <>
    {isOpen && (
    <div
        className="h-full fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
    />
    )}
    <div className={`z-50 fixed left-0 top-0 h-full w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Header with user info */}
      
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-pink-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-lg">{dashboardContext?.name[0]}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{dashboardContext?.name}</h3>
            <p className="text-sm text-gray-500">{dashboardContext?.email}</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:cursor-pointer">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Middle section with workspace button */}
      <div className="flex-1 p-6 hover:cursor-pointer">
              <Link to={"/workspace"}>
        <button className="w-full  hover:bg-gray-100 rounded-lg p-4 text-left transition-colors duration-200 hover:cursor-pointer">
          <div className="flex items-center justify-between">
            
            <span className="font-medium text-gray-700">Workspace</span>
            <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-600">›</span>
            </div>
          </div>
        </button>
        </Link>
      </div>

      {/* Bottom navigation */}
      <div className="border-t border-gray-100 p-6 space-y-2">

        {/* Home Button */}
        <Link to={"/"}>
        <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200  hover:cursor-pointer">
          <Home size={20} />
          <span className="font-medium">Home</span>
        </button>
        </Link>

        {/* Logout Button */}
        <button className="w-full flex items-center space-x-3 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 hover:cursor-pointer" onClick={handleLogout}>
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
