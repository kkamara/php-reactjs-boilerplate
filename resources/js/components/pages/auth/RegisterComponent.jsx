import React, { useEffect, useState, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { Helmet, } from "react-helmet"
import { register, authorize, } from '../../../redux/actions/authActions'

import "./RegisterComponent.scss"

export default function RegisterComponent() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const dispatch = useDispatch()
  const authState = useSelector(state => (state.auth))

  useEffect(() => {
    if (localStorage.getItem("user-token")) {
      return navigate("/")
    } else if (authState.loading) {
      dispatch(authorize())
    }
  }, [authState,])

  const onFormSubmit = (e) => {
    e.preventDefault()

    dispatch(register({
      password_confirmation: passwordConfirmation,
      name,
      email,
      password
    }))

    setName("")
    setEmail("")
    setPassword("")
    setPasswordConfirmation("")
  }

  const onNameChange = (e) => {
    setName(e.target.value)
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
    return <div className='container register-container text-center'>
      <Helmet>
        <title>Register - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return <div className='container register-container text-start'>
    <Helmet>
      <title>Register - {import.meta.env.VITE_APP_NAME}</title>
    </Helmet>
    <div className="col-md-4 offset-md-4">
      <h1 className="register-lead fw-bold">Register</h1>
      <form method="post" onSubmit={onFormSubmit}>
        {authState.error ?
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {authState.error}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div> : null}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            name="name" 
            className="form-control"
            value={name}
            onChange={onNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            name="email" 
            className="form-control"
            value={email}
            onChange={onEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            name="password" 
            className="form-control"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">Password Confirmation</label>
          <input 
            type="password"
            name="password_confirmation" 
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
}
