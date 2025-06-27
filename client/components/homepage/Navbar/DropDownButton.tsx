import { useContext } from "react";
import { DropDownContext } from "./DropDownContext";

function DropDownButton() {
    const dropDownStatus_ = useContext(DropDownContext);

    const handleClick = () => {
      if (!dropDownStatus_) return;

      if (dropDownStatus_.dropDownStatus === "hidden") {
        dropDownStatus_.setDropDownStatus("block");
      } else {
        dropDownStatus_.setDropDownStatus("hidden");
      }
    };

    return (
      <div className="md:hidden">
        <button className="text-gray-700 hover:text-gray-900 p-2 hover:cursor-pointer" onClick={handleClick}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    );
}

export default DropDownButton;
