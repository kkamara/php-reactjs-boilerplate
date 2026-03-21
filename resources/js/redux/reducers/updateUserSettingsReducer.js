import { updateUserSettings, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function updateUserSettingsReducer (state = initState, action) {
  switch (action.type) {
    
    case updateUserSettings.UPDATE_USER_SETTINGS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case updateUserSettings.UPDATE_USER_SETTINGS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case updateUserSettings.UPDATE_USER_SETTINGS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      }

    default:
      return state
  }
}
