import DropDownButton from "./DropDownButton.tsx";
import { Link  } from "react-router-dom";
import LoginSigninButtons from "./LoginSigninButtons.tsx";
import NavLinks from "./NavLinks.tsx";
import Avatar from "./Avatar.tsx";
import { useState, useEffect } from "react";
import axios from "axios";
import AvatarDropDown from "./AvatarDropDown.tsx";
import { LoginContext } from "./LoggedInContext.ts";

const Navbar = () => {
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
    <header className="w-full bg-[#fdfdfd] font-sans ">
      <div className="max-w-8xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex justify-around items-center h-34">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={"/"}><h1 className="font-['Inter'] text-3xl font-bold text-pink-400">DoneFlow</h1></Link>
          </div>
          
          {/* Navigation */}
          <NavLinks />
          {/* Auth Button */}
          <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            <div className="flex items-center">
            {loggedIn ? (
              <AvatarDropDown initials={initials} name={name} email={email} />
            ) : (
              <LoginSigninButtons />
            )}
          </div>
          </LoginContext.Provider>
           
          
          {/* Mobile menu button */}
          <DropDownButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
