interface PriorityInterface {
    priority: "low" | "medium" | "high",
    setPriority: React.Dispatch<React.SetStateAction<"low" | "medium" | "high">>
    reload: boolean

}
const Priority:React.FC<PriorityInterface> = ({priority, setPriority}) => {
      const getPriorityColor = (priorityLevel: string, isSelected: boolean) => {
    if (!isSelected) return "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"

    switch (priorityLevel) {
      case "low":
        return "bg-green-50 text-green-700 border-green-200 ring-1 ring-green-200"
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-200"
      case "high":
        return "bg-red-50 text-red-700 border-red-200 ring-1 ring-red-200"
      default:
        return "bg-gray-50 text-gray-600 border-gray-200"
    }
  }
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Priority Level</label>
            <div className="grid grid-cols-3 gap-3">
              {(["low", "medium", "high"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setPriority(level)}
                  className={`hover:cursor-pointer px-4 py-3 rounded-xl border text-sm font-medium transition-all ${getPriorityColor(
                    level,
                    priority === level,
                  )}`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
    )
}
export default Priority;