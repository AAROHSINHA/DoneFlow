const TodayQuickStats = () => {
    return (
        <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-semibold text-green-600">8 tasks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="text-sm font-semibold text-blue-600">3 tasks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-semibold text-orange-600">2 tasks</span>
              </div>
            </div>
    )
}
export default TodayQuickStats;