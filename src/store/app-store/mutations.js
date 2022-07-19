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
export function setQProjects(state, qProjects) {
  state.qProjects = qProjects
}
export function setSingleProject(state, singleProject) {
  state.singleProject = singleProject
}
export function setSubmitStatus(state, submitStatus) {
  state.submitStatus = submitStatus
}
export function setPageStatus(state, pageStatus) {
  state.pageStatus = pageStatus
}
export function updateProject(state, payload) {
  for (const i in state.qProjects) {
    if (state.qProjects[i].id === payload.id) {
      state.qProjects[i] = payload;
      break;
    }
  }
}