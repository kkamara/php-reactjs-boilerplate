import React from 'react'
import { createRoot, } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'

import App from './App'
import store from './redux/store'

import './index.scss'
import favicon from './favicon.png'

import $ from'jquery/dist/jquery.min.js'
import Popper from'@popperjs/core/dist/cjs/popper'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import './zephyr_bootstrap.css'

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Helmet>
      <link 
        rel="icon" 
        type="image/png"
        href={favicon}
      />
    </Helmet>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)