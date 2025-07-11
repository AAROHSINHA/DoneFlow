import DashboardNavbar from "./Navbar/DashboardNavbar.tsx";
import DashboardSection from "./DashboardSection/DashboardSection.tsx";
import { useState } from "react";
function Dashboard() {
   const [isOpen, onClose] = useState(false);
  return (
    <div>
      <DashboardNavbar onClose={() => onClose(true)} />
      <DashboardSection isOpen={isOpen} onClose={() => onClose(false)} />
    </div>
  )
}

export default Dashboard
