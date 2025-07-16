import { useContext } from "react";
import { DropDownContext } from "./DropDownContext";
import DropDownLinks from "./DropDownLinks.tsx";

function Dropdown() {
  const dropDownStatus_ = useContext(DropDownContext);

  if (!dropDownStatus_ || dropDownStatus_.dropDownStatus === "hidden") return null;

  return (
    <nav className="flex mt-[0.8em] justify-around md:hidden bg-[#FDFDFD] font-['Inter']">
      <DropDownLinks title="Tasks" path="/workspace" />
      <DropDownLinks title="Dashboard" path="/dashboard"/>
      <DropDownLinks title="Profile" path="/profile"/>
    </nav>
  );
}

export default Dropdown;
