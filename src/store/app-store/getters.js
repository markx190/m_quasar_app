export function loggedIn(state) {
  return state.appUser.uStatus.loggedIn
  // return state.logUser
}
export function currentUser(state) {
  return state.localUser
}
export function regResponse(state) {
  return state.regResponse
}
export function authResponse(state) {
  return state.authResponse
}
export function isSuccess(state) {
  return state.isSuccess
}



