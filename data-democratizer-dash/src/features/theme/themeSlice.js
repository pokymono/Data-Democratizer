import { createSlice } from "@reduxjs/toolkit"

// Check for user's preferred color scheme
const getPreferredTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = window.localStorage.getItem('theme')
    if (storedTheme) {
      return storedTheme
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  }
  
  return 'light'
}

const initialState = {
  theme: getPreferredTheme(),
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light"
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('theme', state.theme)
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('theme', action.payload)
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions

export default themeSlice.reducer
