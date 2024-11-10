import React, { useEffect, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { Helmet, } from "react-helmet"
import { logout, } from '../../../redux/actions/authActions'

export default function LogoutComponent() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  useEffect(() => {}, [])

  let token

  useEffect(() => {
    token = localStorage.getItem("user-token")
    if (token !== null) {
      dispatch(logout())
    }
  })

  useEffect(() => {
    token = localStorage.getItem("user-token")
    if (token === null) {
      return navigate("/user/login")
    }
  }, [authState,])

  if (authState.loading) {
    return <div className="container logout-container text-center">
      <Helmet>
        <title>Log Out - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return null
}
