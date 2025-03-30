import {
    BarChart3,
    Home,
    Settings,
    FileText,
    PieChart,
    LineChart,
    HelpCircle,
    MessageSquare,
    Database,
  } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
  
  export default function Sidebar() {
    return (
      <div className="hidden md:flex h-screen w-64 flex-col bg-gray-800 text-white dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-700 px-4 py-4">
          <div className="flex items-center">
            <BarChart3 className="h-6 w-6 mr-2" />
            <span className="text-lg font-semibold">Gen AI Analytics</span>
          </div>
          <ThemeToggle />
        </div>
  
        <div className="flex-1 overflow-auto py-2">
          <div className="px-3 py-2">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Dashboards</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center rounded-md px-3 py-2 text-sm font-medium bg-gray-700 text-white">
                  <Home className="mr-2 h-5 w-5" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <LineChart className="mr-2 h-5 w-5" />
                  <span>Analytics</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  <span>Reports</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <PieChart className="mr-2 h-5 w-5" />
                  <span>Insights</span>
                </a>
              </li>
            </ul>
          </div>
  
          <div className="px-3 py-2 mt-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Tools</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Database className="mr-2 h-5 w-5" />
                  <span>Data Sources</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  <span>AI Assistant</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <HelpCircle className="mr-2 h-5 w-5" />
                  <span>Help & Support</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
  
        <div className="border-t border-gray-700 p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-sm font-medium">U</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">User</p>
              <p className="text-xs text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

