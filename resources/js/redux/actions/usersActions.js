import HttpService from "../../services/HttpService"
import { users, } from "../types"

export const getUsers = page => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: users.GET_USERS_PENDING, })

    const tokenID = "user-token"
    const path = page ? "/users/?page="+page : "/users"
    await http.getData(http.domain+"/sanctum/csrf-cookie").then( 
      http.getData(path, tokenID)
        .then(res => {
          dispatch({
            type: users.GET_USERS_SUCCESS,
            payload: res.data,
          })
        }).catch(error => {
          let message
          if ("ERR_NETWORK" === error.code) {
            message = "Server unavailable."
          } else if (error.response?.data?.message) {
            message = error.response.data.message
          } else {
            message = "Something went wrong. Please come back later."
          }
          dispatch({ 
            type: users.GET_USERS_ERROR, 
            payload: message,
          })
        })
    )
  }
}
