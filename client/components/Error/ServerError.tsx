import { ServerCrash } from "lucide-react";

interface ServerErrorProps {
  title?: string;
  message?: string;
  showRetryButton?: boolean;
  showHomeButton?: boolean;
}

const ServerError = ({
  title = "Internal Server Error",
  message = "Something went wrong on our end. Please try again later.",
  showRetryButton = true,
  showHomeButton = true,
}: ServerErrorProps) => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-6 py-10 font-sans text-center relative overflow-hidden">
      {/* Background watermark error code */}
      <div className="absolute text-[200px] md:text-[300px] font-extrabold opacity-5 select-none pointer-events-none z-0 text-gray-300 leading-none">
        500
      </div>

      <div className="relative z-10 bg-white shadow-xl rounded-2xl p-10 max-w-xl w-full">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
            <ServerCrash className="w-10 h-10 text-gray-700" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-5xl font-black text-gray-900 mb-3 tracking-tight">
          500
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-8 text-lg leading-relaxed text-balance">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {showRetryButton && (
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition font-medium hover:cursor-pointer"
            >
              Try Again
            </button>
          )}

          {showHomeButton && (
            <a
              href="/"
              className="px-6 py-2 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-100 transition font-medium hover:cursor-pointer"
            >
              Go Home
            </a>
          )}
        </div>

        {/* Footer Brand */}
        <div className="mt-10 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 tracking-wide">doneflow</p>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
