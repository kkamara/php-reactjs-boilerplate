import { combineReducers, } from "redux"
import authReducer from "./authReducer"
import usersReducer from "./usersReducer"
import avatarReducer from "./avatarReducer"
import updateUserSettingsReducer from "./updateUserSettingsReducer"
import removeAvatarReducer from "./removeAvatarReducer"

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  avatar: avatarReducer,
  updateUserSettings: updateUserSettingsReducer,
  removeAvatar: removeAvatarReducer,
})
