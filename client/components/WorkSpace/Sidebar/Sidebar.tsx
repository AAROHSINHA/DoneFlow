import  ProfileSection  from "../Sidebar/ProfileSection.tsx";
import BottomSection from "../Sidebar/BottomSection.tsx";
import  NavigationSection  from "../Sidebar/NavigationSection.tsx";

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  updateTags: boolean
}

function Sidebar({ isOpen, onClose, updateTags }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
    {isOpen && (
    <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
    />
    )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors hover:cursor-pointer"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Profile Section */}
          <ProfileSection />

          {/* Navigation Section */}
          <NavigationSection updateTags={updateTags} />

          {/* Bottom Section */}
          <BottomSection />
        </div>
      </div>
    </>
  )
}
export default Sidebar;
