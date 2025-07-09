import { Link } from "react-router-dom"

function NavigationDashBoards() {
  return (
    <Link to={"/dashboard"}>
    <div className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
          <div className="w-5 h-5 mr-3">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
              />
            </svg>
          </div>
          <span className="font-medium">Dashboard</span>
        </div>
    </Link>
  )
}

export default NavigationDashBoards
