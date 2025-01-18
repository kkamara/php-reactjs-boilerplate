
import HttpService from '../../services/HttpService'
import { users, } from '../types'

export const getUsers = page => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: users.GET_USERS_PENDING, })

    const tokenId = "user-token"
    const path = page ? '/users/?page='+page : '/users'
    await new Promise((resolve, reject) => {
      http.getData(http.domain+'/sanctum/csrf-cookie').then( 
        http.getData(path, tokenId).then(res => {
          resolve(dispatch({
            type: users.GET_USERS_SUCCESS,
            payload: res.data,
          }))
        }, error => {
          reject(dispatch({ 
            type : users.GET_USERS_ERROR, 
            payload: error,
          }))
        })
      ).catch(error => {
        reject(dispatch({ 
          type : users.GET_USERS_ERROR, 
          payload: error,
        }))
      })
    })
  }
}
