import HttpService from './HttpService'

export const RegisterUserService = (data) => {
  const http = new HttpService()
  const tokenId = "user-token"
  return new Promise((resolve, reject) => {
    http.getData('sanctum/csrf-cookie').then(
      () => http.postData('user/register', data)
      .then((response) => {
        localStorage.setItem(tokenId, response.data.data.token)
        return resolve(response.data.data)
      })
      .catch(err => reject(err))
    ).catch(err => err)
  })
}

export const LoginUserService = (credentials) => {
  const http = new HttpService()
  const tokenId = "user-token"
    
  return new Promise((resolve, reject) => {
    http.getData(http.domain+'/sanctum/csrf-cookie').then( 
      // 419 when without csrf wrapper
      () => http.postData('user', credentials)
        .then(response => {
          localStorage.setItem(tokenId, response.data.data.token)
          return resolve(response.data.data)
        })
        .catch(err => reject(err))
    ).catch(err => reject(err))
  })
}

export const AuthorizeUserService = () => {
  const http = new HttpService()
  const tokenId = "user-token"
    
  return new Promise((resolve, reject) => {
    http.getData(http.domain+'/sanctum/csrf-cookie').then( 
      // 419 when without csrf wrapper
      () => http.getData('user/authorize', tokenId)
        .then(response => {
          return resolve(response.data.data)
        })
        .catch(err => reject(err))
    ).catch(err => reject(err))
  })
}

export const LogoutUserService = () => {
  const http = new HttpService()
  const tokenId = "user-token"
  return http.getData('sanctum/csrf-cookie').then(
    () => http.getData('users/logout', tokenId)
      .then((response) => {
        if (localStorage.getItem(tokenId) !== null) {
          localStorage.removeItem(tokenId)
        }
        return response
      })
      .catch(err => err)
  ).catch(err => err)
}