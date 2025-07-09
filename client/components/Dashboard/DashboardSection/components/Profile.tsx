const Profile = () => {
    return (
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            {/* Profile Circle */}
            <div className="w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">U</span>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">Username</h2>
              <p className="text-gray-600">user@example.com</p>
            </div>

            {/* Profile Button */}
            <button className="px-6 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition-colors font-medium">
              Profile
            </button>
          </div>
        </div>
    )
}

export default Profile;