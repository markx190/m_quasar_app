export function regResponse(state, regResponse) {
  state.regResponse = regResponse
}
export function authResponse(state, authResponse) {
  state.authResponse = authResponse
}
export function isSuccess(state, isSuccess) {
  state.isSuccess = isSuccess
}
export function registerSuccess(state) {
  state.appUser.uStatus.loggedIn = false
}
export function setLoggedIn(state) {
  state.appUser.uStatus.loggedIn = true
}
export function loginFailure(state) {
  state.appUser.uStatus.loggedIn = false
}
export function logOutUser(state) {
  state.appUser.uStatus.loggedIn = false
}
export function setCurrentUser(state, localUser) {
  state.localUser = localUser
}