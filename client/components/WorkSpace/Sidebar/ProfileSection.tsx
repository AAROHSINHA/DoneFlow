import { useState, useEffect } from "react";
import axios from "axios";
function ProfileSection() {
  const [initials, setInitials] = useState("U");
    const [username, setUsername] = useState("user");
    const [email, setEmail] = useState("user@example.com");
  
    useEffect(() => {
      const getUser = async () => {
        try{
           const res = await axios.get("http://localhost:5000/users/check-login", {
            withCredentials: true,
          });
          if(res.data.loggedIn){
              setInitials(res.data.user.name[0]);
              setUsername(res.data.user.name);
              setEmail(res.data.user.email);
          }
         }catch(error){
              console.log(error);
         }
      }
      getUser();
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