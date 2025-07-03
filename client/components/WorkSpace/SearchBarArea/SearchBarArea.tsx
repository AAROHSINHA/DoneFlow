export default function SearchBarArea() {
  return (
    <div className="px-6 md:px-12 lg:px-16 pb-7">
      <div className="flex flex-col md:flex-row items-center gap-4 h-auto md:h-[10vh]  rounded-lg">
        {/* Search Bar - 35-40% width */}
        <div className="w-full md:w-[35%] h-[50px] md:h-[70%]">
          <input
            type="text"
            placeholder="Search Tasks"
            className="w-full h-full bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700 placeholder-gray-500"
          />
        </div>

        {/* Progress Card - Remaining width */}
        <div className="w-full md:flex-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between h-full gap-6">
            {/* Completed */}
            <div className="flex flex-col justify-center flex-1 text-center w-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[12px] font-medium text-gray-700" style={{ letterSpacing: "3px" }}>
                  Completed
                </h3>
                <p className="text-sm font-semibold text-green-600" style={{ letterSpacing: "3px" }}>
                  75%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>

            {/* In Progress */}
            <div className="flex flex-col justify-center flex-1 text-center w-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[12px] font-medium text-gray-700" style={{ letterSpacing: "3px" }}>
                  In Progress
                </h3>
                <p className="text-sm font-semibold text-blue-600" style={{ letterSpacing: "3px" }}>
                  45%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>

            {/* Not Started */}
            <div className="flex flex-col justify-center flex-1 text-center w-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700" style={{ letterSpacing: "3px" }}>
                  Not Started
                </h3>
                <p className="text-sm font-semibold text-red-600" style={{ letterSpacing: "3px" }}>
                  20%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-400 h-2 rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
