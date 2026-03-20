import React, { useEffect, useState, } from "react"
import { useNavigate, } from "react-router-dom"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import { register, authorise, } from "../../../redux/actions/authActions"
import ErrorComponent from "../../layouts/ErrorComponent"

import "./RegisterComponent.scss"

const defaultFirstNameState = ""
const defaultLastNameState = ""
const defaultEmailState = ""
const defaultPasswordState = ""
const defaultPasswordConfirmationState = ""

export default function RegisterComponent() {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState(defaultFirstNameState)
  const [lastName, setLastName] = useState(defaultLastNameState)
  const [email, setEmail] = useState(defaultEmailState)
  const [password, setPassword] = useState(defaultPasswordState)
  const [passwordConfirmation, setPasswordConfirmation] = useState(defaultPasswordConfirmationState)

  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const authState = useSelector(state => (state.auth))

  useEffect(() => {
    if (localStorage.getItem("user-token")) {
      return navigate("/")
    } else if (authState.loading) {
      dispatch(authorise())
    }
    if (authState.error && "Token not set." !== authState.error) {
      setError(authState.error)
    }
    if (null !== authState.data) {
      navigate("/user/login")
    }
  }, [authState])

  const onFormSubmit = (e) => {
    e.preventDefault()

    dispatch(register({
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
    }))

    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setPasswordConfirmation("")
  }

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }

  const onLastNameChange = (e) => {
    setLastName(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onPasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value)
  }

  if (authState.loading) {
    return <div className="container register-container text-center">
      <Helmet>
        <title>Register - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return <div className="container register-container text-start">
    <Helmet>
      <title>Register - {import.meta.env.VITE_APP_NAME}</title>
    </Helmet>
    <div className="col-md-4 offset-md-4">
      <h1 className="register-lead fw-bold">Register</h1>
      <div>
        <ErrorComponent error={error} />
        <form method="post" onSubmit={onFormSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name*:</label>
            <input 
              name="firstName" 
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={onFirstNameChange}
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name*:</label>
            <input 
              name="lastName" 
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={onLastNameChange}
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email*:</label>
            <input 
              name="email" 
              className="form-control"
              id="email"
              value={email}
              onChange={onEmailChange}
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password*:</label>
            <input 
              type="password"
              name="password" 
              className="form-control"
              id="password"
              value={password}
              onChange={onPasswordChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirmation">Password Confirmation*:</label>
            <input 
              type="password"
              name="passwordConfirmation" 
              id="passwordConfirmation"
              className="form-control"
              value={passwordConfirmation}
              onChange={onPasswordConfirmationChange}
            />
          </div>
          <div className="register-buttons-container mt-4 text-end">
            <a 
              href="/user/login" 
              className="btn btn-primary"
            >
              Sign In
            </a>
            <input 
              type="submit" 
              className="btn btn-success register-submit-button ms-4" 
            />
          </div>
        </form>
      </div>
    </div>
  </div>
}
