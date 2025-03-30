"use client"

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setQuery, submitQuery, querySuccess, queryFailure } from "../features/query/querySlice"
import { Send, Sparkles } from "lucide-react"

export default function QueryInput() {
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const suggestionsRef = useRef(null)
  const dispatch = useDispatch()
  const input = useSelector((state) => state.query.query)
  const suggestions = useSelector((state) => state.query.suggestions)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    dispatch(submitQuery(input))

    // Simulate AI processing with a timeout
    setTimeout(() => {
      try {
        const chartTypes = ["line", "bar", "area", "pie"]
        const randomChart = chartTypes[Math.floor(Math.random() * chartTypes.length)]

        // Generate random data based on the query
        let mockData
        if (input.toLowerCase().includes("quarter") || input.toLowerCase().includes("quarterly")) {
          mockData = {
            data: [230000, 310000, 280000, 350000],
            labels: ["Q1", "Q2", "Q3", "Q4"],
            type: randomChart,
            title: "Quarterly Revenue Performance",
          }
        } else if (input.toLowerCase().includes("region") || input.toLowerCase().includes("regions")) {
          mockData = {
            data: [185000, 240000, 160000, 210000, 190000],
            labels: ["North", "South", "East", "West", "Central"],
            type: randomChart,
            title: "Sales Performance by Region",
          }
        } else if (input.toLowerCase().includes("product") || input.toLowerCase().includes("top")) {
          mockData = {
            data: [42000, 38000, 35000, 30000, 28000],
            labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
            type: "bar",
            title: "Top 5 Product Performance",
          }
        } else if (input.toLowerCase().includes("acquisition") || input.toLowerCase().includes("cost")) {
          mockData = {
            data: [120, 105, 95, 110, 125, 115],
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            type: "line",
            title: "Customer Acquisition Cost Trend",
          }
        } else if (input.toLowerCase().includes("conversion") || input.toLowerCase().includes("traffic")) {
          mockData = {
            data: [3.2, 3.5, 3.8, 4.1, 3.9, 4.2],
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            type: "area",
            title: "Website Conversion Rate (%)",
          }
        } else {
          // Default random data
          mockData = {
            data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 50),
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            type: randomChart,
            title: "Data Analysis Results",
          }
        }

        dispatch(querySuccess(mockData))
      } catch (error) {
        dispatch(queryFailure("Error processing query. Please try again."))
      }
    }, 2000)

    setSuggestionsOpen(false)
  }

  const handleSuggestionClick = (suggestion) => {
    dispatch(setQuery(suggestion))
    setSuggestionsOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSuggestionsOpen(true)
      }
    }

    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestionsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white">Ask a business question</h3>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Press{" "}
          <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
            ⌘/
          </kbd>{" "}
          for suggestions
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            placeholder="Example: Show me revenue trends by quarter..."
            className="h-12 w-full pl-4 pr-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <button
            type="button"
            className="absolute right-12 top-0 h-12 w-10 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 flex items-center justify-center"
            onClick={() => setSuggestionsOpen(!suggestionsOpen)}
          >
            <Sparkles className="h-4 w-4" />
          </button>

          {suggestionsOpen && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search for queries..."
                  className="w-full p-2 border border-gray-200 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="max-h-60 overflow-auto">
                <div className="p-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Suggested Queries</div>
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm dark:hover:bg-gray-700 dark:text-gray-300"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`absolute right-2 top-0 h-12 w-12 bg-purple-600 text-white rounded-md flex items-center justify-center ${!input.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"}`}
          disabled={!input.trim()}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}

