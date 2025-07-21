import { useState, useEffect, useContext } from "react";
import { SidebarContext } from "../SidebarContext";

import axios from "axios";
function ProfileSection() {
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
  }, [])


  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-pink-400 rounded-lg flex items-center justify-center">
          <span className="text-white font-semibold text-lg">{initials}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{username}</h3>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
    </div>
  )
}
export default ProfileSection;