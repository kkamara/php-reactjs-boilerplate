import HttpService from "../../services/HttpService"
import { removeAvatar, } from "../types"

export const removeAvatarFile = () => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: removeAvatar.REMOVE_AVATAR_PENDING, })

    const tokenID = "user-token"
    await http.delData("/user/avatar", tokenID)
      .then(res => {
        dispatch({
          type: removeAvatar.REMOVE_AVATAR_SUCCESS,
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
          type: removeAvatar.REMOVE_AVATAR_ERROR, 
          payload: message,
        })
      })
  }
}
