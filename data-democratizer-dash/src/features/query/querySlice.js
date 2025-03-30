import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  query: "",
  history: [],
  loading: false,
  error: null,
  result: null,
  suggestions: [
    "Show me revenue trends by quarter",
    "Compare sales performance across regions",
    "What were our top 5 products last month?",
    "Analyze customer acquisition cost over time",
    "Show me website traffic conversion rates",
  ],
}

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    submitQuery: (state, action) => {
      state.loading = true
      state.error = null
      state.query = action.payload
      if (!state.history.includes(action.payload)) {
        state.history.unshift(action.payload)
        // Keep history limited to 10 items
        if (state.history.length > 10) {
          state.history.pop()
        }
      }
    },
    querySuccess: (state, action) => {
      state.loading = false
      state.result = action.payload
    },
    queryFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    useHistoryQuery: (state, action) => {
      state.query = action.payload
    },
    clearResults: (state) => {
      state.result = null
    },
  },
})

export const { setQuery, submitQuery, querySuccess, queryFailure, useHistoryQuery, clearResults } = querySlice.actions

export default querySlice.reducer