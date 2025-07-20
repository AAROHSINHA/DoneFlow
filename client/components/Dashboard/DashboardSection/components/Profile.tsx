import { Link } from "react-router-dom";
import { useContext } from "react";
import { DashboardContext } from "../../DashboardContext";
const Profile = () => {
  const dashboardContext = useContext(DashboardContext);



  return (
    <div className="mb-8">
      <div className="flex items-center space-x-4">
        {/* Profile Circle */}
        <div className="w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{dashboardContext?.name[0]}</span>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{dashboardContext?.name}</h2>
          <p className="text-gray-600">{dashboardContext?.email}</p>
        </div>

        {/* Profile Button */}
        <Link to={"/profile"}>
          <button className="px-6 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition-colors font-medium hover:cursor-pointer">
            Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
