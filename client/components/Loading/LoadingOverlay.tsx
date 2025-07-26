interface LoadingOverlayProps {
  isVisible: boolean
}

export default function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
        <p className="text-white text-xl font-semibold tracking-wider">LOADING...</p>
      </div>
    </div>
  )
}
