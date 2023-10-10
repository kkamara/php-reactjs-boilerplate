import React, { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useNavigate, } from 'react-router-dom' 

export default function Header(props) {
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const authResponse = useSelector(state=>state.auth)

  const logOut = () => {
    // dispatch(LogoutAction())
    navigate("/user/login")
  }

  const login = () => {
    navigate("/user/login")
  }

  const token = localStorage.getItem('user-token')
  
  useEffect(() => {
    if(token === null){
        localStorage.removeItem('user-token')
        navigate("/user/login")    
    } 
    return () => {}
  }, [authResponse])

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
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              User
            </a>
            <ul className="dropdown-menu">
              <li>
                {authResponse.data !== null ?
                  <a 
                    className="dropdown-item" 
                    href="/user/logout"
                  >
                    Logout
                  </a> : 
                  <>
                    <a 
                      className="dropdown-item" 
                      href="/user/login"
                    >
                      Login
                    </a>
                  </>}
              </li>              
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
}
