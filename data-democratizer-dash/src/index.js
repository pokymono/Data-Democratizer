import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import "./index.css"
import App from "./App"
import { store } from "./store/store"
import reportWebVitals from "./reportWebVitals"

// Get the root element
const container = document.getElementById("root")
// Create a root
const root = createRoot(container)
// Render app to root
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

