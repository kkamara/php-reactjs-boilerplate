import React from "react"
import { createRoot, } from "react-dom/client"
import { Provider } from "react-redux"

import App from "./App"
import store from "./redux/store"

import "./index.scss"

import $ from"jquery/dist/jquery.min.js"
import Popper from"@popperjs/core/dist/cjs/popper"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

import "./zephyr_bootstrap.css"

const container = document.getElementById("app")
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)