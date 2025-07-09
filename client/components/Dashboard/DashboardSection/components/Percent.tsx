const Percent = () => {
    return (
        <div className="h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-600">Pie Chart</p>
                <p className="text-xs text-gray-400">Chart.js</p>
              </div>
            </div>
    )
}
export default Percent;