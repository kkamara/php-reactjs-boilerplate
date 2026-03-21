import { removeAvatar, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function removeAvatarReducer (state = initState, action) {
  switch (action.type) {
    
    case removeAvatar.REMOVE_AVATAR_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case removeAvatar.REMOVE_AVATAR_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case removeAvatar.REMOVE_AVATAR_SUCCESS:
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
