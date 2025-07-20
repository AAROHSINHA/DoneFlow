import { AlertCircle } from "lucide-react";

interface ErrorPageProps {
  code?: string;
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
}

const ErrorPage = ({
  code = "404",
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist.",
  showHomeButton = true,
  showBackButton = true,
}: ErrorPageProps) => {
  return (
    <div className="font-['Inter'] min-h-screen flex items-center justify-center bg-[#FDFDFD] text-pink-500 px-4 py-10 relative overflow-hidden">
      {/* Background watermark code */}
      <div className="absolute text-[300px] md:text-[400px] font-extrabold opacity-5 select-none pointer-events-none z-0 leading-none">
        {code}
      </div>

      {/* Main Content */}
      <div className="z-10 relative bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center">
        {/* Icon Circle */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-300 rounded-full flex items-center justify-center shadow-inner shadow-pink-200 animate-pulse-slow">
            <AlertCircle className="w-10 h-10 text-pink-600" />
          </div>
        </div>

        {/* Code */}
        <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">
          {code}
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-balance">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-500 mb-8 text-balance leading-relaxed">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-pink-400 text-pink-500 rounded-md hover:bg-pink-100 transition font-medium hover:cursor-pointer"
            >
              Go Back
            </button>
          )}
          {showHomeButton && (
            <a
              href="/"
              className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition font-medium hover:cursor-pointer"
            >
              Home
            </a>
          )}
        </div>

        {/* Footer Branding */}
        <div className="mt-10 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 tracking-wide">DONEFLOW</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
