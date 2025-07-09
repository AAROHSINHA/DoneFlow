import ReturnHome from "../../ProfilePage/components/ReturnHome.tsx";
import Options from "./Options.tsx";
import AvatarDropDown from "../../homepage/Navbar/AvatarDropDown.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

function DashboardNavbar() {
    const [loggedIn, setLoggedIn] = useState(false);
  const [initials, setInitials] = useState("U");
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("example@gmail.com");

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/check-login", {
          withCredentials: true,
        });
        if(res.data.loggedIn){
          setLoggedIn(res.data.loggedIn);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setInitials(res.data.user.name[0]);
        }
      } catch (error) {
        console.error("Error checking login:", error);
        setLoggedIn(false);
      }
    };

    checkLogin();

    const interval = setInterval(checkLogin, 60 * 1000); // every 60 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <header className="w-full bg-white font-sans">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-34 pl-[3em] pr-[3em]">
            <Options />
      <div>
        <h1
              className="text-gray-700 text-[1.5em] hover:text-gray-900 px-3 py-2 text-base transition-colors font-semibold tracking-[3px]"
            >
              DASHBOARD
            </h1>
      </div>
        <AvatarDropDown initials={initials} name={name} email={email} />
        </div>
      </div>
    </header>
  )
}

export default DashboardNavbar
