import { useContext } from "react";
import { DashboardContext } from "../DashboardContext.ts";
import Options from "./Options.tsx";
import AvatarDropDown from "../../homepage/Navbar/AvatarDropDown.tsx";


interface Prop {
  onClose: () => void
}

function DashboardNavbar({onClose} : Prop) {
  const dashboardContext = useContext(DashboardContext);

  return (
    <header className="w-full bg-white font-sans">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-34 pl-[3em] pr-[3em]">
            <Options onClose={onClose}/>
      <div>
        <h1
              className="text-gray-700 text-[1.5em] hover:text-gray-900 px-3 py-2 text-base transition-colors font-semibold tracking-[3px]"
            >
              DASHBOARD
            </h1>
      </div>
        <AvatarDropDown initials={dashboardContext?.name[0]} name={dashboardContext?.name} email={dashboardContext?.email} />
        </div>
      </div>
    </header>
  )
}

export default DashboardNavbar
