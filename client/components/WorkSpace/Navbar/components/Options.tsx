import { useContext } from "react";
import { SidebarContext } from "../../SidebarContext";
const Options = () => {
      const sidebarContext = useContext(SidebarContext);
    const handleClick = () => {
        sidebarContext?.onClose(true);
        sidebarContext?.taskOnClose(false);
    }
    return (
        <div className="">
        <button className="text-gray-700 hover:text-gray-900 p-2 hover:cursor-pointer" onClick={handleClick}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    )
}

export default Options;
