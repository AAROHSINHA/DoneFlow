import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
function UserInfo() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  useEffect(() => {
    const checkInfo = async () => {
      try {
      const res = await axios.get("https://doneflow.onrender.com/users/check-login", {
        withCredentials: true,
      });

      if (res.data.loggedIn) {
        const userEmail = res.data.user.email;
        setEmail(userEmail);
        setName(res.data.user.name);
      } else {
        setEmail("user@example.com");
        setName("@username");
      }
    } catch (error) {
      toast.error("Error Showing User Credentials");
    }
  };
    
  checkInfo();
  }, []);
  return (
    <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">@{name}</h1>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>
  )
}

export default UserInfo
