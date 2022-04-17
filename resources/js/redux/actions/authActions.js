
import { LoginUserService, } from '../../services/AuthServices'
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
            dispatch({ 
                type : auth.AUTH_LOGIN_ERROR, 
                payload: error,
            })
        })
    }
}
