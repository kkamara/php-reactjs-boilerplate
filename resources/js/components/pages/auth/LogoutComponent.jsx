import React, { useEffect, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { logout, } from '../../../redux/actions/authActions'

export default function LogoutComponent() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  useEffect(() => {}, [])

  let token

  useEffect(() => {
    token = localStorage.getItem("user-token")
    if (token === null) {
      return navigate("/user/login")
    } else {
      dispatch(logout())
    }
  }, [authState,])

  if (authState.loading) {
    return <p>Loading...</p>
  }

  return null
}
