import React from 'react'
import { useSelector, } from 'react-redux'

export default function Header(props) {  
  const authResponse = useSelector(state=>state.auth)

  const renderNavLinks = () => {
    if(authResponse.data) {
      return <a 
        className="dropdown-item" 
        href="/user/logout"
      >
        Logout
      </a>
    } else {
        return <>
          <a 
            className="dropdown-item" 
            href="/user/login"
          >
            Login
          </a>
          <a 
            className="dropdown-item" 
            href="/user/register"
          >
            Register
          </a>
        </>
    }
  }

  return <nav className="container navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">PHP Reactjs Boilerplate</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              User
            </a>
            <ul className="dropdown-menu">
              <li>{renderNavLinks()}</li>              
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
}
