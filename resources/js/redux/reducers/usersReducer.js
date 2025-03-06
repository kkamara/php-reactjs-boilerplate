import { users, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function usersReducer (state = initState, action) {
  switch (action.type) {
    
    case users.GET_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case users.GET_USERS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case users.GET_USERS_SUCCESS:
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
