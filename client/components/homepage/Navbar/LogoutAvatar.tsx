import { LogOut } from 'lucide-react';
import axios from 'axios';
import { useContext } from 'react';
import { LoginContext } from './LoggedInContext';
import { useNavigate } from 'react-router-dom';

interface LogoutButtonProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutAvatar: React.FC<LogoutButtonProps> = ({ setIsOpen }) => {
  const navigate = useNavigate();
    const {loggedIn, setLoggedIn} = useContext(LoginContext);
  const handleLogout = async () => {
    try{
        await axios.post(
            "http://localhost:5000/users/logout",
            null, // no body
            { withCredentials: true }
            );
        setLoggedIn(false);
        navigate("/");
    }catch(error){
        console.log(error);
        alert("ERROR LOGGING OUT");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center px-3 py-2 text-xs bg-pink-400 text-white hover:bg-pink-500 rounded hover:cursor-pointer"
    >
      <LogOut className="w-3 h-3 mr-2" />
      Logout
    </button>
  );
};

export default LogoutAvatar;
