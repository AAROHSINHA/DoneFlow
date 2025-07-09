import HourlyChart from "./HourlyChart";
const Barchart = () => {
    return (
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">Progress Analytics</h3>
                <p className="text-gray-500 mt-1">Track your productivity over time</p>
              </div>

              {/* Toggle Button for Hourly/Weekly */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md transition-colors">
                  Hourly
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-pink-400 text-white rounded-md transition-colors">
                  Weekly
                </button>
              </div>
            </div>

            {/* Large Bar Chart Placeholder */}
           <div className="h-120 bg-white rounded-lg p-4 shadow">
              <HourlyChart data={Array.from({ length: 24 }, () => Math.floor(Math.random() * 60))} />

            </div>

          </div>
    )
}

export default Barchart;
