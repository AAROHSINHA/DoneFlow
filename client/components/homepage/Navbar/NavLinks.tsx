import  { Link }  from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../Context.ts";
import { useContext } from "react";

function NavLinks() {
  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);
  const about = () => {
    loginContext?.scrollTo.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }
  const workspace = () => {
    if(loginContext?.loggedIn) navigate("/workspace");
    else navigate("/create-account");
  }
  const dashboard = () => {
    if(loginContext?.loggedIn) navigate("/dashboard");
    else navigate("/create-account");
  }
  return (
    <div>
      <nav className="font-['Inter'] hidden md:flex space-x-12 mt-[0.8em]">
            <p
              className="text-gray-700 hover:text-gray-900 hover:cursor-pointer px-3 py-2 text-base transition-colors font-light"
              onClick={about}
            >
              About
            </p>
            
            <p
              className="text-gray-700 hover:text-gray-900 hover:cursor-pointer px-3 py-2 text-base transition-colors font-light"
              onClick={workspace}
            >
              Tasks
            </p>
         
              <p
              className="text-gray-700 hover:text-gray-900 hover:cursor-pointer px-3 py-2 text-base transition-colors font-light"
              onClick={dashboard}
            >
              Dashboard
            </p>
            
          </nav>
    </div>
  )
}

export default NavLinks
