import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../Context"
function DropDownLinks(props: {title: string, path: string}) {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if(loginContext?.loggedIn) navigate(props.path);
    else navigate("/login");
  }
  return (
    <div className="w-[100%] h-14">
     
      <a
              href="#about"
              className="text-gray-700 hover:text-gray-900 px-2 py-2 text-base transition-colors font-light flex justify-center hover:cursor-pointer border-l border-gray-300  w-[100%] h-[100%] items-center"
              onClick={handleClick}
            >
              {props.title}
            </a>
    </div>
  )
}

export default DropDownLinks
