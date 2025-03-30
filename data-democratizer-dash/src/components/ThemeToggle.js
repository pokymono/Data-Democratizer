import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../features/theme/themeSlice"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.theme)
  
  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  )
}
