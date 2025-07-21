import Navbar from "../homepage/Navbar/Navbar.tsx";
import Dropdown from "../homepage/Navbar/Dropdown.tsx";
import { DropDownContext } from "../homepage/Navbar/DropDownContext.ts";
import { useState } from 'react';



function NavbarMain() {
    const [dropDownStatus, setDropDownStatus] = useState("hidden");
    return (
      <DropDownContext.Provider value={{ dropDownStatus, setDropDownStatus }}>
        <div className="w-[100vw]">
          <Navbar  />
          <Dropdown />
        </div>
      </DropDownContext.Provider>
    );
}

export default NavbarMain;
