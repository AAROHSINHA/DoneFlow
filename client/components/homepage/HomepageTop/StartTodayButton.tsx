import { useContext } from "react";
import { LoginContext } from "../Context";
import { useNavigate } from "react-router-dom";
function StartTodayButton() {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();
  const handleStartToday = () => {
    if(loginContext?.loggedIn){
      navigate("/workspace");
    }else{
      navigate("/create-account")
    }
  }
  return (
    <div className="pt-4">
      <button className="font-['Inter'] rounded-full bg-white px-8 py-4 text-lg font-medium text-gray-700 shadow-sm hover:shadow-md transition-all duration-200 border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50 hover:cursor-pointer" onClick={handleStartToday}>
        Start today - <span className="text-pink-400 font-semibold">It's Free!</span>
      </button>
    </div>
  )
}

export default StartTodayButton