import { configureStore } from "@reduxjs/toolkit"
import queryReducer from "../features/query/querySlice"
import themeReducer from "../features/theme/themeSlice"

export const store = configureStore({
  reducer: {
    query: queryReducer,
    theme: themeReducer,
  },
})

