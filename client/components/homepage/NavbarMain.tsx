import Navbar from "../homepage/Navbar/Navbar.tsx";
import Dropdown from "../homepage/Navbar/Dropdown.tsx";
import { DropDownContext } from "../homepage/Navbar/DropDownContext.ts";
import React, { useState } from 'react';

interface Prop {
  setNavbarLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

function NavbarMain({setNavbarLoaded} : Prop) {
    const [dropDownStatus, setDropDownStatus] = useState("hidden");
    return (
      <DropDownContext.Provider value={{ dropDownStatus, setDropDownStatus }}>
        <div className="w-[100vw]">
          <Navbar setNavbarLoaded={setNavbarLoaded} />
          <Dropdown />
        </div>
      </DropDownContext.Provider>
    );
}

export default NavbarMain;
