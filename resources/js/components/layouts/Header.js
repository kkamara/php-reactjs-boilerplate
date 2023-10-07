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

  return null
}
