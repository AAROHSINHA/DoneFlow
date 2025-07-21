import DashboardNavbar from "./Navbar/DashboardNavbar.tsx";
import DashboardSection from "./DashboardSection/DashboardSection.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "./DashboardContext.ts";
import axios from "axios";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const [isOpen, onClose] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
     const setup = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/check-login", {
          withCredentials: true,
        });
        if (res.data.loggedIn) {
          setLoggedIn(true);
          setEmail(res.data.user.email || "");
          setName(res.data.user.name || "");
        } else {
          navigate("/error");
        }
      } catch (error) {
        toast.error("Some error occurred!")
        navigate("/")
      }
     }

     setup();
  }, [])

  return (
    <div>
      <DashboardContext.Provider value={{email: email, name: name}}>
        <DashboardNavbar onClose={() => onClose(true)} />
        <DashboardSection isOpen={isOpen} onClose={() => onClose(false)} />
      </DashboardContext.Provider>
    </div>
  )
}

export default Dashboard    
