import { Link } from "react-router-dom"
function LoginSigninButtons() {
  return (
    <div>
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
    </div>
          
  )
}

export default LoginSigninButtons
