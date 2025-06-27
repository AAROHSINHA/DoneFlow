import {Link} from "react-router-dom";

function LoginTopText() {
  return (
    <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600">
            Don't have an account?{' '}
            <span className="text-pink-400 hover:text-pink-500 font-medium">
              <Link to={"/create-account"}>Sign up</Link>
            </span>
          </p>
        </div>
  )
}

export default LoginTopText
