import React from "react"
import { Routes, Route, } from "react-router-dom"

import Header from "./components/layouts/Header"
import Footer from "./components/layouts/Footer"

import Home from "./components/pages/HomeComponent"
import Login from "./components/pages/auth/LoginComponent"
import Logout from "./components/pages/auth/LogoutComponent"
import Register from "./components/pages/auth/RegisterComponent"
import Settings from "./components/pages/auth/SettingsComponent"

import NotFound from "./components/pages/http/NotFoundComponent"

import { url, } from "./utils/config"
import AuthRoute from "./AuthRoute"

export default () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route element={<AuthRoute/>}>
          <Route path={url("/")} element={<Home />}/>
          <Route path={url("/user/settings")} element={<Settings />}/>
        </Route>
        <Route path={url("/user/login")} element={<Login />}/>
        <Route path={url("/user/logout")} element={<Logout />}/>
        <Route path={url("/user/register")} element={<Register />}/>
        <Route path={url("*")} element={<NotFound />}/>
      </Routes>
      <Footer/>
    </>
  )
}
