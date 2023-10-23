import React, { useEffect, useState, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { login, } from '../../../redux/actions/authActions'

import "./LoginComponent.scss"

export default function LoginComponent() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("jane@doe.com")
  const [password, setPassword] = useState("secret")

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
  }))

  useEffect(() => {
    if (state.auth.data) {
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
    return <p>Loading...</p>
  }

  return (
    <>
      <div className='container login-container'>
        <div className="col-md-4 offset-md-4">
          <h3 className="lead">Login</h3>
          <form method="post" onSubmit={onFormSubmit}>
            {state.auth.error ?
              <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {state.auth.error}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> : null}
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
            <a 
              href="/user/register" 
              className="btn btn-primary"
            >
              Register
            </a>
            <input 
              type="submit" 
              className="btn btn-success" 
            />
          </form>
        </div>
      </div>
    </>       
  )
}
