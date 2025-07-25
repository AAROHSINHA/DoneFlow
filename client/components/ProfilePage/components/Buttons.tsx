import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Buttons() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try{
        await axios.post(
            "https://doneflow.onrender.com/users/logout",
            null, // no body
            { withCredentials: true }
            );
        toast.success("Logged Out Successfully!");
        navigate("/");
    }catch(error){
        toast.error("Unable to logout! Pleasy try later...");
    }
  };
  return (
    <div className="space-y-3">
            
            <button className="w-full bg-pink-400 text-white py-4 px-6 rounded-xl font-semibold hover:bg-pink-500 hover:cursor-pointer transition-colors duration-200 shadow-sm hover:shadow-md" onClick={() => navigate("/workspace")}>
              <p >Workspace</p>
            </button>
            
            
            <button className="w-full bg-white border-2 border-pink-400 text-pink-400 py-4 px-6 rounded-xl font-semibold hover:cursor-pointer  hover:bg-pink-50 transition-colors duration-200" onClick={() => navigate("/dashboard")}>
              <p >Dashboard</p>
            </button>
            
            <button className="w-full bg-gray-100 text-gray-600 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 hover:cursor-pointer transition-colors duration-200" onClick={handleLogout}>
              Logout
            </button>
          </div>
  )
}

export default Buttons
