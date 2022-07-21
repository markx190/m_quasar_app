export function loggedIn(state) {
  return state.appUser.uStatus.loggedIn
  // return state.logUser
}
export function currentUser(state) {
  return state.localUser
}
export function isSuccess(state) {
  return state.isSuccess
}
export function submitStatus(state) {
  return state.submitStatus
}
export function qComments(state) {
  return state.qComments
}


