import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import * as Sentry from "@sentry/react";

function LogoutButton() {
      const navigate = useNavigate();
  const handleLogout = async () => {
    try{
        await axios.post(
            "http://localhost:5000/users/logout",
            null, // no body
            { withCredentials: true }
            );
        navigate("/");
    }catch(error){
        Sentry.captureException(error);
        toast.error("Error logging out! Try again in some time...")
    }
  };

  return (
    <div className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors" onClick={handleLogout}>
        <div className="w-5 h-5 mr-3">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>
        <span className="font-medium">Logout</span>
      </div>
  )
}

export default LogoutButton
