import "./App.css"
import { useEffect } from "react"
import QueryInput from "./components/QueryInput"
import QueryHistory from "./components/QueryHistory"
import ResultDisplay from "./components/ResultDisplay"
import LoadingIndicator from "./components/LoadingIndicator"
import Sidebar from "./components/Sidebar"
import { useSelector } from "react-redux"

function App() {
  const result = useSelector((state) => state.query.result)
  const loading = useSelector((state) => state.query.loading)
  const theme = useSelector((state) => state.theme.theme)
  
  useEffect(() => {
    // Apply theme to document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow dark:bg-gray-900 dark:border-b dark:border-gray-700">
          <div className="px-4 py-4 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4">
          <div className="flex flex-col lg:flex-row h-full gap-4">
            {/* Main Panel */}
            <div className="lg:w-3/4 space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-900 dark:border dark:border-gray-700">
                <QueryInput />
              </div>

              {loading ? (
                <LoadingIndicator />
              ) : result ? (
                <ResultDisplay />
              ) : (
                <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400">
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
            <div className="lg:w-1/4">
              <QueryHistory />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

