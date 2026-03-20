import React, {
  useEffect,
  useState,
  useRef,
} from "react"
import { Helmet, } from "react-helmet"
import { useSelector, useDispatch, } from "react-redux"

import ErrorComponent from "../../layouts/ErrorComponent"
import { uploadAvatar, } from "../../../redux/actions/avatarActions"
import { updateSettings, } from "../../../redux/actions/updateUserSettingsActions"

import "./SettingsComponent.scss"
import { removeAvatarFile } from "../../../redux/actions/removeAvatarActions"

const defaultFirstNameState = ""
const defaultLastNameState = ""
const defaultEmailState = ""
const defaultPasswordState = ""
const defaultPasswordConfirmationState = ""

export default function SettingsComponent() {
  const state = useSelector(state => ({
    auth: state.auth,
    avatar: state.avatar,
    updateUserSettings: state.updateUserSettings,
    removeAvatar: state.removeAvatar,
  }))
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState(defaultFirstNameState)
  const [lastName, setLastName] = useState(defaultLastNameState)
  const [email, setEmail] = useState(defaultEmailState)
  const [password, setPassword] = useState(defaultPasswordState)
  const [passwordConfirmation, setPasswordConfirmation] = useState(defaultPasswordConfirmationState)
  const avatarFile = useRef(null)

  const [error, setError] = useState("")

  useEffect(() => {
    setFirstName(state.auth.data.user.firstName)
    setLastName(state.auth.data.user.lastName)
    setEmail(state.auth.data.user.email)
  }, [])

  useEffect(() => {
    if (false === state.avatar.loading) {
      if (null !== state.avatar.error) {
        setError(state.avatar.error)
      }
      if (null !== state.avatar.data) {
        window.location.reload()
      }
    }
  }, [state.avatar])

  useEffect(() => {
    if (false === state.updateUserSettings.loading) {
      if (null !== state.updateUserSettings.error) {
        setError(state.updateUserSettings.error)
      }
      if (null !== state.updateUserSettings.data) {
        window.location.reload()
      }
    }
  }, [state.updateUserSettings])

  useEffect(() => {
    if (false === state.removeAvatar.loading) {
      if (null !== state.removeAvatar.error) {
        setError(state.removeAvatar.error)
      }
      if (null !== state.removeAvatar.data) {
        window.location.reload()
      }
    }
  }, [state.removeAvatar])

  const handleFirstNameChange = e => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = e => {
    setLastName(e.target.value)
  }

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handlePasswordConfirmationChange = e => {
    setPasswordConfirmation(e.target.value)
  }

  const handleUploadFileBtnClick = () => {
    avatarFile.current.click()
  }

  const handleAvatarFileChange = e => {
    setError("")
    const err = imageError(e)
    if (false !== err) {
      return setError(err)
    }
    const payload = new FormData()
    payload.append("avatar", e.target.files[0])
    // Send upload avatar request
    // console.log("payload", [...payload])
    dispatch(uploadAvatar(
      payload,
    ))
  }
  
  const handleRemoveFileBtnClick = () => {
    dispatch(removeAvatarFile())
  }

  const imageError = e => {
    if (1 !== e.target.files.length) {
      return "Please select 1 image file."
    } else if (null === e.target.files[0].type.match(/(jpg|jpeg|png|webp)$/i)) {
      return "Invalid file extension. We take JPG, JPEG, PNG, and WEBP."
    }
    return false
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    setError("")
    dispatch(updateSettings({
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
    }))
  }
  
  if (state.auth.loading) {
    <div className="container settings-container text-center">
      <Helmet>
        <title>User Settings - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return (
    <div className="container settings-container">
      <Helmet>
        <title>User Settings - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h1 className="fw-bold">User Settings</h1>

          <ErrorComponent error={error}/>

          <div className="edit-avatar-container">
            <img
              src={state.auth.data.user.avatarPath}
              alt="Avatar Image"
              className="img-fluid avatar-image"
            />
            <input
              type="file"
              id="avatarFile"
              ref={avatarFile}
              style={{display: "none"}}
              onChange={handleAvatarFileChange}
            />
            <br />
            <button
              className="btn btn-default"
              onClick={handleUploadFileBtnClick}
            >
              Upload
            </button>
            <br />
            <button
              className="btn btn-danger btn-sm"
              onClick={handleRemoveFileBtnClick}
            >
              Remove Photo
            </button>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">
                First Name*:
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">
                Last Name*:
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email*:
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirmation">
                Password Confirmation:
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={handlePasswordConfirmationChange}
              />
            </div>
            <div className="float-end">
              <input
                type="submit"
                className="btn btn-success"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
