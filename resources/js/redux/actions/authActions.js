
import { LoginUserService, AuthorizeUserService, } from '../../services/AuthServices'
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
                error.response.data.password[0];
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
