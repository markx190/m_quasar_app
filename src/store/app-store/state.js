import { LocalStorage } from 'quasar'
export default function () {
  const localUser = LocalStorage.getItem('user')
  console.log('local user: ', localUser)
  return {
    // state
    regResponse: '',
    authResponse: '',
    isSuccess: null,
    user: null,
    appUser: {
      uStatus: {
        loggedIn: false
      }
    },
    localUser: !localUser ? {} : localUser
  }
}

