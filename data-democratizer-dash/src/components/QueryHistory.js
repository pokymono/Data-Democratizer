"use client"
import { useDispatch, useSelector } from "react-redux"
import { submitQuery } from "../features/query/querySlice"
import { History, RefreshCw } from "lucide-react"

export default function QueryHistory() {
  const dispatch = useDispatch()
  const history = useSelector((state) => state.query.history)

  const handleRunQuery = (query) => {
    dispatch(submitQuery(query))
  }

  return (
    <div className="bg-white rounded-lg shadow-md h-full dark:bg-gray-900 dark:border dark:border-gray-700">
      <div className="px-4 py-3 border-b flex items-center dark:border-gray-700">
        <History className="mr-2 h-4 w-4 dark:text-gray-400" />
        <h3 className="text-lg font-medium dark:text-white">Query History</h3>
      </div>
      <div className="p-0">
        {history.length > 0 ? (
          <div className="h-[calc(100vh-12rem)] overflow-auto">
            <div className="space-y-1 p-2">
              {history.map((query, index) => (
                <div key={index} className="group relative flex items-start rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none dark:text-white">{query}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString()}</p>
                  </div>
                  <button
                    className="h-7 w-7 rounded-md opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
                    onClick={() => handleRunQuery(query)}
                  >
                    <RefreshCw className="h-3.5 w-3.5 dark:text-gray-400" />
                    <span className="sr-only">Run again</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">No queries yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

