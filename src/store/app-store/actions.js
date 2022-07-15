import { LocalStorage } from 'quasar'
import AuthService from '../../services/auth.service';
// const localUser = JSON.parse(localStorage.getItem('user'));

export async function register(context, user) {
  return await AuthService.register(user)
    .then((response) => {
      console.log('message: ', response)
      context.commit('registerSuccess', response.data);
      context.commit('regResponse', response.data.message);
      let resStatus = response.request.status
      console.log('resStatus: ', resStatus)
      resStatus === 200 ? context.commit('isSuccess', true) : null
      return response.data
    })
    .catch((error) => {
      console.log('error: ', error)
      context.commit('regResponse', error);
      context.commit('isSuccess', false)
      return error
    })
}
export async function login(context, user) {
  return await AuthService.login(user)
    .then((user) => {
      const localUser = LocalStorage.getItem('user')
      context.commit('setCurrentUser', localUser)
      context.commit('setLoggedIn')
      return user
    })
    .catch((error) => {
      console.log('login error: ', error.response.data.message)
      context.commit('authResponse', error.response.data.message);
      context.commit('loginFailure')
      return error
    })
}

export async function logout(context, user) {
  return await AuthService.logout(user)
    .then((user) => {
      context.commit('setCurrentUser', null)
      context.commit('logOutUser')
      return user
    })
    .catch((error) => {
      return error
    })
}
