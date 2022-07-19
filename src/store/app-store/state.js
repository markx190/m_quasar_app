import { LocalStorage } from 'quasar'
export default function () {
  const localUser = LocalStorage.getItem('user')
  return {
    // state
    apiURL: 'http://localhost:8080/api',
    regResponse: '',
    authResponse: '',
    submitStatus: '',
    pageStatus: '',
    isSuccess: null,
    user: null,
    appUser: {
      uStatus: {
        loggedIn: false
      }
    },
    localUser: !localUser ? {} : localUser,
    qProjects: [],
    singleProject: {}
  }
}

