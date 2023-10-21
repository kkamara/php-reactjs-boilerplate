
import { 
  LoginUserService, 
  AuthorizeUserService,
  LogoutUserService,
  RegisterUserService,
} from '../../services/AuthServices'
import { auth, } from '../types'

export const login = creds => {
  return dispatch => {
        
    dispatch({ type: auth.AUTH_LOGIN_PENDING, })

    LoginUserService(creds).then(res => {
      dispatch({
        type: auth.AUTH_LOGIN_SUCCESS,
        payload: res,
      })
        
    }, error => {
      const message = error.response.data[0] ||
        error.response.data.email[0] ||
        error.response.data.password[0]
      dispatch({ 
        type : auth.AUTH_LOGIN_ERROR, 
        payload: message,
      })
    })
  }
}

export const authorize = () => {
  return dispatch => {
        
    dispatch({ type: auth.AUTH_AUTHORIZE_PENDING, })
    const tokenId = "user-token"
    if (localStorage.getItem(tokenId) === null) {
      return dispatch({ 
        type : auth.AUTH_AUTHORIZE_ERROR, 
        payload: (new Error(
          "Token not set."
        )).message,
      })
    }    

    AuthorizeUserService().then(res => {
      dispatch({
        type: auth.AUTH_AUTHORIZE_SUCCESS,
        payload: res,
      })
        
    }, error => {
        dispatch({ 
          type : auth.AUTH_AUTHORIZE_ERROR, 
          payload: error,
        })
    })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({ type: auth.AUTH_LOGOUT_PENDING, })

    LogoutUserService().then(res => {
      dispatch({
        type: auth.AUTH_LOGOUT_SUCCESS,
        payload: res,
      })
        
    }, error => {
      const message = error.response.data[0] ||
        error.response.data.email[0] ||
        error.response.data.password[0]
      dispatch({ 
        type : auth.AUTH_LOGOUT_ERROR, 
        payload: message,
      })
    })
  }
}

export const register = data => {
  return dispatch => {
        
    dispatch({ type: auth.AUTH_REGISTER_PENDING, })

    RegisterUserService(data).then(res => {
      dispatch({
        type: auth.AUTH_REGISTER_SUCCESS,
        payload: res,
      })
    }, error => {
      const message = error.response.data[0] ||
        error.response.data.first_name[0] ||
        error.response.data.last_name[0] ||
        error.response.data.email[0] ||
        error.response.data.password[0] ||
        error.response.data.password_confirmation[0]
      dispatch({ 
        type : auth.AUTH_REGISTER_ERROR, 
        payload: message,
      })
    })
  }
}