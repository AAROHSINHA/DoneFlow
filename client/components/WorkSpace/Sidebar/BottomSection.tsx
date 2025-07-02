import HomeButton from "./components/HomeButton.tsx";
import LogoutButton from "./components/LogoutButton.tsx";
import AddTasksSidebar from "./components/AddTasksSidebar.tsx";

function BottomSection() {
  return (
    <div className="p-4 border-t border-gray-200 space-y-2">
      <AddTasksSidebar />
     <HomeButton />
      <LogoutButton />
    </div>
  )
}
export default BottomSection;
