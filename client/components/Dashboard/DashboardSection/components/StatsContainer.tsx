interface StatsContainerProp {
    title: string,
    stats: {[key: string]: number}
}

const StatsContainer = ({title, stats} : StatsContainerProp) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">{title}</h4>
            <div className="space-y-3">
                {Object.entries(stats).map(([key, value]) => (
                    <div className="flex justify-between items-center" key={key}>
                <span className="text-gray-600">{key}</span>
                <span className="font-medium text-gray-900">{value}</span>
              </div>
                ))}
              
            </div>
          </div>
    )
}
export default StatsContainer;