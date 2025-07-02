import  { Link }  from "react-router-dom"
function NavLinks() {
  return (
    <div>
      <nav className="hidden md:flex space-x-12 mt-[0.8em]">
            <p
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base transition-colors font-light"
            >
              About
            </p>
            <p
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base transition-colors font-light"
            >
              Features
            </p>
            <Link to={"/workspace"}>
            <p
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base transition-colors font-light"
            >
              Tasks
            </p>
            </Link>
            <p
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base transition-colors font-light"
            >
              Notes
            </p>
          </nav>
    </div>
  )
}

export default NavLinks
