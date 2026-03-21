import { avatar, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function avatarReducer (state = initState, action) {
  switch (action.type) {
    
    case avatar.UPLOAD_AVATAR_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case avatar.UPLOAD_AVATAR_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case avatar.UPLOAD_AVATAR_SUCCESS:
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
