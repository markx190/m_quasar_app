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
export function submitResponse(state) {
  return state.submitResponse
}
export function authResponse(state) {
  return state.authResponse
}
export function isSuccess(state) {
  return state.isSuccess
}
export function qProjects(state) {
  return state.qProjects
}
export function submitStatus(state) {
  return state.submitStatus
}
export function pageStatus(state) {
  return state.pageStatus
}
export function singleProject(state) {
  return state.singleProject
}


