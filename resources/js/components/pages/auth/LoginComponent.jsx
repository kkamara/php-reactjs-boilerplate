import React, { useEffect, useState, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import { login, authorise, } from "../../../redux/actions/authActions"
import ErrorComponent from "../../layouts/ErrorComponent"

import "./LoginComponent.scss"

const defaultEmailState = "jane@example.com"
const defaultPasswordState = "secret"

export default function LoginComponent() {
  const [email, setEmail] = useState(defaultEmailState)
  const [password, setPassword] = useState(defaultPasswordState)

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
  }))

  useEffect(() => {
    dispatch(authorise())
  }, [])

  useEffect(() => {
    if (null !== state.auth.data) {
      window.location.href = "/"
    }
  }, [state.auth])

  const onFormSubmit = (e) => {
    e.preventDefault()

    dispatch(login({ email, password, }))

    setEmail("")
    setPassword("")
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  if (state.auth.loading) {
    return <div className="container login-container text-center">
      <Helmet>
        <title>Sign In - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return <div className="container login-container">
    <Helmet>
      <title>Sign In - {import.meta.env.VITE_APP_NAME}</title>
    </Helmet>
    <div className="col-md-4 offset-md-4">
      <h1 className="login-lead fw-bold">Sign In</h1>
      <form method="post" onSubmit={onFormSubmit}>
        <ErrorComponent error={state.auth.error} />
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            name="email" 
            className="form-control"
            value={email}
            onChange={onEmailChange}
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password"
            name="password" 
            className="form-control"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div className="login-buttons-container mt-3 text-end">
          <a 
            href="/user/register" 
            className="btn btn-primary"
          >
            Register
          </a>
          <input 
            type="submit" 
            className="btn btn-success login-submit-button ms-4" 
          />
        </div>
      </form>
    </div>
  </div>
}
