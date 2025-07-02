function ProfileSection() {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-pink-400 rounded-lg flex items-center justify-center">
          <span className="text-white font-semibold text-lg">JD</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">John Doe</h3>
          <p className="text-sm text-gray-500">john@example.com</p>
        </div>
      </div>
    </div>
  )
}
export default ProfileSection;