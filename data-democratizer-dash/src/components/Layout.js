import { useSidebar } from "../context/SidebarContext";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  // Call useSidebar unconditionally at the top level
  const { isCollapsed = false } = useSidebar() || {};

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${isCollapsed ? 'ml-0' : 'ml-0'}`}>
        <div className="container mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
