import {X} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SidebarContext } from "../../SidebarContext";

interface HeaderInterface {
    onClose: () => void
}

const Header:React.FC<HeaderInterface> = ({onClose}) => {
  const [initials, setInitials] = useState("U");
  const [username, setUsername] = useState("user");
  const [email, setEmail] = useState("user@example.com");

  const sidebarContext = useContext(SidebarContext);

  useEffect(() => {
    if(sidebarContext?.loggedIn){
      setEmail(sidebarContext.email);
      setUsername(sidebarContext.name);
      setInitials(sidebarContext.name[0]);
    }
  }, [sidebarContext?.loggedIn]);

    return (
 <div className="border-b border-gray-100 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Add New Task</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Minimal Profile */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">{initials}</span>
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">{username}</p>
              <p className="text-gray-500 text-xs">{email}</p>
            </div>
          </div>
        </div>
    )
}

export default Header;
