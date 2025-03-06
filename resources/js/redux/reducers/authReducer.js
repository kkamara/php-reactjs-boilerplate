import { auth, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: true,
}

export default function authReducer (state = initState, action) {
  switch (action.type) {
    
    case auth.AUTH_LOGIN_ERROR:
    case auth.AUTH_LOGOUT_ERROR:
    case auth.AUTH_AUTHORIZE_ERROR:
    case auth.AUTH_REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        data: null
      }
    
    case auth.AUTH_LOGIN_PENDING:
    case auth.AUTH_LOGOUT_PENDING:
    case auth.AUTH_AUTHORIZE_PENDING:
    case auth.AUTH_REGISTER_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case auth.AUTH_LOGIN_SUCCESS:
    case auth.AUTH_LOGOUT_SUCCESS:
    case auth.AUTH_AUTHORIZE_SUCCESS:
    case auth.AUTH_REGISTER_SUCCESS:
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
