import { Link } from "react-router-dom"
function AvatarButtons() {
  return (
    <div>
      <Link to={"/profile"}>
      <button
            className="hover:cursor-pointer w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
          >
            Profile
          </button></Link>
          <button
            className="hover:cursor-pointer w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
          >
            Workspace
          </button>
          <button
            className="hover:cursor-pointer w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
          >
            Dashboard
          </button>
    </div>
  )
}

export default AvatarButtons
