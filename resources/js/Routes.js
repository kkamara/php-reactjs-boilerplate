import React from 'react'
import { Routes, Route, } from 'react-router-dom'

import Header from './components/layouts/Header'

import Home from "./components/pages/HomeComponent"

import { url } from './utils/config'

export default () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path={url("/")} element={<Home />}/>
      </Routes>
    </>
  )
}
