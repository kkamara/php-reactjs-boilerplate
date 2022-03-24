import React, { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { useNavigate, } from 'react-router-dom' 

export default function Header(props) {
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const authResponse = useSelector(state=>state.auth)

  const logOut = () => {
    // dispatch(LogoutAction())
    navigate("/login")
  }

  const login = () => {
    navigate("/login")
  }

  const token = localStorage.getItem('user-token')
  //console.log(token)

  // useEffect(() => {
  //   if(authResponse !== "" && authResponse.success === true){
  //       alert(authResponse.message)
  //       localStorage.removeItem('user-token')
  //       //history.push("/user/login")    
  //   } 
  //   return () => {}
  // }, [authResponse])

  return null
}
