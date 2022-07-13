export function setSubmitResponse(state, submitResponse) {
  state.submitResponse = submitResponse
}
export function registerSuccess(state) {
  console.log('statex: ', state.status)
  state.status.loggedIn = false;
}
export function registerFailure(state) {
  state.status.loggedIn = false;
}   