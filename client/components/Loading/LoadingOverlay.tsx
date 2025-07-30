import { useEffect } from "react"

interface LoadingOverlayProps {
  isVisible: boolean
}

export default function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  useEffect(() => {
    // Lock scroll when mounted
    document.body.style.overflow = "hidden";
    document.documentElement.style.padding = "0";
    document.documentElement.style.margin = "0";

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.padding = "";
      document.documentElement.style.margin = "";
    };
  }, []); // Runs only once when mounted

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
        <p className="text-white text-xl font-semibold tracking-wider">LOADING...</p>
      </div>
    </div>
  )
}
