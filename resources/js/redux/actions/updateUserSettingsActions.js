import HttpService from "../../services/HttpService"
import { updateUserSettings, } from "../types"

export const updateSettings = payload => {
  return async dispatch => {
    const http = new HttpService()

    dispatch({ type: updateUserSettings.UPDATE_USER_SETTINGS_PENDING, })

    const tokenID = "user-token"
    await http.patchData(
      "/user",
      payload,
      tokenID,
    )
      .then(res => {
        dispatch({
          type: updateUserSettings.UPDATE_USER_SETTINGS_SUCCESS,
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
          type: updateUserSettings.UPDATE_USER_SETTINGS_ERROR, 
          payload: message,
        })
      })
  }
}
