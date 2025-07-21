import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  title?: string;
  message?: string;
}

const ErrorPage = ({
  title = "Something Went Wrong",
  message = "We encountered an unexpected error. Please try again later.",
}: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="font-['Inter'] min-h-screen flex items-center justify-center bg-[#FDFDFD] text-pink-500 px-4 py-10 relative overflow-hidden">
      {/* Main Content */}
      <div className="z-10 relative bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center">
        {/* Icon Circle */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-300 rounded-full flex items-center justify-center shadow-inner shadow-pink-200 animate-pulse-slow">
            <AlertCircle className="w-10 h-10 text-pink-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-balance">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-500 mb-8 text-balance leading-relaxed">
          {message}
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition font-medium hover:cursor-pointer"
        >
          Return Home
        </button>

        {/* Footer Branding */}
        <div className="mt-10 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 tracking-wide">DONEFLOW</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
