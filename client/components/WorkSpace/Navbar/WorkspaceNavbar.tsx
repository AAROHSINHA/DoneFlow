import AvatarDropDown from "../../homepage/Navbar/AvatarDropDown.tsx";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Options from "./components/Options.tsx";
import Title from "./components/Title.tsx";
import { SidebarContext } from "../SidebarContext.ts";


const WorkspaceNavbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [initials, setInitials] = useState("U");
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("example@gmail.com");

  const sidebarContext = useContext(SidebarContext);

  useEffect(() => {
    if(sidebarContext?.loggedIn){
      setName(sidebarContext.name);
      setEmail(sidebarContext.email);
      setInitials(sidebarContext.name[0]);
      setLoggedIn(true);
    }
  }, [])

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/users/check-login", {
  //         withCredentials: true,
  //       });
  //       if(res.data.loggedIn){
  //       setLoggedIn(res.data.loggedIn);
  //       setName(res.data.user.name);
  //       setEmail(res.data.user.email);
  //       setInitials(res.data.user.name[0]);
  //       }
  //     } catch (error) {
  //       console.error("Error checking login:", error);
  //       setLoggedIn(false);
  //     }
  //   };

  //   checkLogin();

  //   const interval = setInterval(checkLogin, 60 * 1000); // every 60 seconds

  //   return () => clearInterval(interval);
  // }, []);
  return (
    <header className="w-full bg-[#fdfdfd] font-sans">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-34 pl-[3em] pr-[3em]">
            <Options />
            <Title />
          <AvatarDropDown initials={initials} name={name} email={email} />
        </div>
      </div>
    </header>
  );
};

export default WorkspaceNavbar;
