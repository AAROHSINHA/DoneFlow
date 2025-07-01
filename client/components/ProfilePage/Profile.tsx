import Buttons from "./components/Buttons.tsx";
import UserInfo from "./components/UserInfo.tsx";
import Stats from "./components/Stats.tsx";
import ProfilePicture from "./components/ProfilePicture.tsx";
import ReturnHome from "./components/ReturnHome.tsx";
import img from "./profileTop2.jpg";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      <div className="relative h-48 overflow-hidden">
        
        {/* Background image, fills entire hero */}
        <img
          src={img}
          alt="Profile background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 opacity-60"></div>

        {/* Top Navigation */}
        <div className="relative z-10">
          <ReturnHome />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="flex justify-center px-6 pb-12 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
          <ProfilePicture />
          <UserInfo />
          <Stats />
          <Buttons />
        </div>
      </div>
    </div>
  );
};

export default Profile;
