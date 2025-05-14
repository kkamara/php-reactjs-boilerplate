import React, { useEffect, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import { logout, } from "../../../redux/actions/authActions"

export default function LogoutComponent() {
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(logout())
  }, [])

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
