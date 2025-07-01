import { Upload } from "lucide-react";

function ProfilePicture() {
  return (
    <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-gray-100 rounded-full border-4 border-pink-100 flex items-center justify-center hover:border-pink-200 transition-colors duration-200 cursor-pointer group">
              <Upload className="w-8 h-8 text-gray-400 group-hover:text-pink-400 transition-colors duration-200" />
            </div>
          </div>
  )
}

export default ProfilePicture
