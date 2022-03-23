import React from 'react'
import { Routes, Route, } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import { Guard } from './Guard'

import Header from './components/layouts/Header'

import Home from "./components/pages/HomeComponent"

import { url } from './utils/config'

export default () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path={url("/")} element={<Home />}/>  

        {/*Redirect if not authenticated */} 
        {/* <Guard 
            path={url("/user" )}
            token="user-token" 
            routeRedirect={url("/user/login" )}
            component={PrivateRoute}
        /> */}
      </Routes>
    </>
  )
}
