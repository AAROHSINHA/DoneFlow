import { useContext } from "react";
import { DropDownContext } from "./DropDownContext";
import DropDownLinks from "./DropDownLinks.tsx";

function Dropdown() {
  const dropDownStatus_ = useContext(DropDownContext);

  if (!dropDownStatus_ || dropDownStatus_.dropDownStatus === "hidden") return null;

  return (
    <nav className="flex mt-[0.8em] justify-around md:hidden">
      <DropDownLinks title="About" />
      <DropDownLinks title="Features" />
      <DropDownLinks title="FAQ" />
      <DropDownLinks title="Sign In" />
      <DropDownLinks title="Sign Up" />
    </nav>
  );
}

export default Dropdown;
