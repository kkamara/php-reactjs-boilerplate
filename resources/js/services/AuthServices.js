import axios from 'axios'
import HttpService from './HttpService'

axios.defaults.withCredentials = true

export const RegisterUserService = (credentials) => {
    const http = new HttpService()
    return http.getData('sanctum/csrf-cookie').then(
        () => http.postData('users/register', credentials)
            .then((data) => {
                return data
            })
            .catch(err => err)
    ).catch(err => err)
}

export const LoginUserService = (credentials) => {
    const http = new HttpService()
    const tokenId = "user-token"
    
    return new Promise((resolve, reject) => {
        http.getData(http.domain+'/sanctum/csrf-cookie').then( 
            // 419 when without csrf wrapper
            () => http.postData('user', credentials)
                .then(data => {
                    localStorage.setItem(tokenId, data.data.data.token)
                    return resolve(data.data.data)
                })
                .catch(err => reject(err))
        ).catch(err => reject(err))
    })
}

export const LogOutUserService = () => {
    const http = new HttpService()
    const tokenId = "user-token"
    return http.getData('sanctum/csrf-cookie').then(
        () => http.getData('users/logout', tokenId)
            .then((data) => {
                return data
            })
            .catch(err => err)
    ).catch(err => err)
}
