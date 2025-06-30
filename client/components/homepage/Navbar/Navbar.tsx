import DropDownButton from "./DropDownButton.tsx";
// import { Link  } from "react-router-dom";
import LoginSigninButtons from "./LoginSigninButtons.tsx";
import NavLinks from "./NavLinks.tsx";
import Avatar from "./Avatar.tsx";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [initials, setInitials] = useState("U");

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/check-login", {
          withCredentials: true,
        });
        setLoggedIn(res.data.loggedIn);
        setInitials(res.data.user.name[0]);
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
    <header className="w-full bg-white font-sans ">
      <div className="max-w-8xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex justify-around items-center h-34">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-pink-400">DoneFlow</h1>
          </div>
          
          {/* Navigation */}
          <NavLinks />
          
          {/* Auth Button */}
           <div className="flex items-center">
            {loggedIn ? (
              <Avatar initials={initials} />
            ) : (
              <LoginSigninButtons />
            )}
          </div>
          
          {/* Mobile menu button */}
          <DropDownButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
