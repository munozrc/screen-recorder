import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app"

import "./index.css"

const rootElement = document.getElementById("root") as HTMLElement
const createRoot = ReactDOM.createRoot(rootElement)

createRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
