import React, { useEffect, useState, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import moment from 'moment'
import { logout, } from '../../../redux/actions/authActions'

export default function LogoutComponent() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  useEffect(() => {}, [])

  useEffect(() => {
    if (authState.data === null) {
        return navigate("/user/login");
    } else {
        dispatch(logout())
    }
  }, [authState,])

  if (authState.loading) {
    return <p>Loading...</p>
  }

  return null
}
