import "./App.css"
import { useEffect, useState } from "react"
import QueryInput from "./components/QueryInput"
import QueryHistory from "./components/QueryHistory"
import ResultDisplay from "./components/ResultDisplay"
import LoadingIndicator from "./components/LoadingIndicator"
import Sidebar from "./components/Sidebar"
import { useSelector } from "react-redux"
import { SidebarProvider, useSidebar } from "./context/SidebarContext";

function App() {
  const theme = useSelector((state) => state.theme.theme)
  
  useEffect(() => {
    // Apply theme to document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Add observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [theme])

  return (
    <SidebarProvider>
      <AppContent />
    </SidebarProvider>
  )
}

function AppContent() {
  const { isCollapsed } = useSidebar();
  const result = useSelector((state) => state.query.result)
  const loading = useSelector((state) => state.query.loading)
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isCollapsed ? 'ml-0' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80 dark:border-b dark:border-gray-700 transition-all duration-300">
          <div className="px-4 py-4 sm:px-6">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">Analytics Dashboard</h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4">
          <div className="flex flex-col lg:flex-row h-full gap-4">
            {/* Main Panel */}
            <div className="lg:w-3/4 space-y-4 fade-in">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md dark:bg-gray-900/90 dark:border dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
                <QueryInput />
              </div>

              {loading ? (
                <LoadingIndicator />
              ) : result ? (
                <ResultDisplay />
              ) : (
                <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white/50 dark:bg-gray-900/50 dark:border-gray-700 dark:text-gray-400 backdrop-blur-sm transition-all duration-300 p-8">
                  <div className="flex max-w-md flex-col items-center text-center">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">No queries yet</h3>
                    <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">
                      Enter a business question in the input field above to see insights
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel */}
            <div className="lg:w-1/4 fade-in" style={{ transitionDelay: '0.15s' }}>
              <QueryHistory />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App

