interface Prop {
    taskTitle: string
}
function Header({taskTitle} : Prop) {
  return (
    <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Focus Timer</h2>
          <p className="text-gray-600 text-sm">{taskTitle}</p>
        </div>
  )
}

export default Header
