import { Link } from "react-router-dom"
function SignupPageText() {
  return (
    <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h1>
        <Link to={"/login"}>
          Already have an account?{' '}
          <span className="text-pink-600 hover:text-pink-700 font-medium">
            Log in
          </span>
        </Link>
      </div>
  )
}

export default SignupPageText
