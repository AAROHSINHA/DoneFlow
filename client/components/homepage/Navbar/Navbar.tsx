import DropDownButton from "./DropDownButton.tsx";
import { Link  } from "react-router-dom";
const Navbar = () => {
  return (
    <header className="w-full bg-white font-sans ">
      <div className="max-w-8xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="flex justify-around items-center h-34">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-pink-400">DoneFlow</h1>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-12 mt-[0.8em]">
            <a
              href="#about"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base transition-colors font-light"
            >
              About
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base transition-colors font-light"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base transition-colors font-light"
            >
              Tasks
            </a>
          </nav>
          
          {/* Auth Button */}
          <div className="flex items-center space-x-4">
            <Link to={"/login"}>
            <button className="hidden sm:inline-flex px-4 py-2 border border-gray-300 rounded-[2em] text-base font-medium text-gray-700 hover:bg-gray-50 transition w-[7em] justify-center hover:cursor-pointer">
              Sign In
            </button>
            </Link>
            <Link to={"/create-account"}>
            <button className="hidden sm:inline-flex px-4 py-2 bg-pink-400 text-white rounded-[2em] text-base font-medium hover:bg-pink-500 transition w-[7em] justify-center hover:cursor-pointer">
              Sign Up
            </button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <DropDownButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
