"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Download, Share2, BarChartIcon, LineChartIcon, PieChartIcon, AreaChartIcon } from "lucide-react"

export default function ResultDisplay() {
  const result = useSelector((state) => state.query.result)
  const [chartType, setChartType] = useState(result?.type || "line")

  if (!result) return null

  // Transform the result data for the chart
  const chartData = result.labels.map((label, index) => ({
    name: label,
    value: result.data[index],
  }))

  // Colors for the charts
  const colors = [
    "#8b5cf6", // purple-500
    "#a78bfa", // purple-400
    "#3b82f6", // blue-500
    "#06b6d4", // cyan-500
    "#10b981", // emerald-500
    "#84cc16", // lime-500
  ]

  // Custom tooltip formatter
  const formatTooltipValue = (value) => {
    if (value > 1000) {
      return `$${(value / 1000).toFixed(1)}k`
    }
    return value
  }

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatTooltipValue(value)} />
              <Bar dataKey="value" fill={colors[0]} radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        )
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => `${name}: ${formatTooltipValue(value)}`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatTooltipValue(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      case "area":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors[0]} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatTooltipValue(value)} />
              <Area type="monotone" dataKey="value" stroke={colors[0]} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        )
      case "line":
      default:
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatTooltipValue(value)} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ r: 4, fill: colors[0] }}
                activeDot={{ r: 6, fill: colors[0] }}
              />
            </LineChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md dark:bg-gray-900 dark:border dark:border-gray-700">
      <div className="flex items-center justify-between border-b px-6 py-4 dark:border-gray-700">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium dark:text-white">{result.title || "Query Results"}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Analysis generated from your query</p>
        </div>
        <div className="flex space-x-2">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setChartType("line")}
              className={`px-3 py-1 text-xs font-medium rounded-l-md flex items-center ${
                chartType === "line"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              }`}
            >
              <LineChartIcon className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Line</span>
            </button>
            <button
              type="button"
              onClick={() => setChartType("bar")}
              className={`px-3 py-1 text-xs font-medium border-t border-b flex items-center ${
                chartType === "bar"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              }`}
            >
              <BarChartIcon className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Bar</span>
            </button>
            <button
              type="button"
              onClick={() => setChartType("area")}
              className={`px-3 py-1 text-xs font-medium border-t border-b flex items-center ${
                chartType === "area"
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              }`}
            >
              <AreaChartIcon className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Area</span>
            </button>
            <button
              type="button"
              onClick={() => setChartType("pie")}
              className={`px-3 py-1 text-xs font-medium rounded-r-md flex items-center ${
                chartType === "pie"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              }`}
            >
              <PieChartIcon className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Pie</span>
            </button>
          </div>
          <button className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-400">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </button>
          <button className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-400">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </button>
        </div>
      </div>
      <div className="p-6">
        {renderChart()}

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {result.data.map((value, index) => (
            <div key={index} className="overflow-hidden rounded-lg border bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="p-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{result.labels[index]}</span>
                  <span className="text-xl font-bold dark:text-white">{value > 1000 ? `$${(value / 1000).toFixed(1)}k` : value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

