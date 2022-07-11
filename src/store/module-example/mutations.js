export function setQStudents(state, qStudents) {
  state.qStudents = qStudents
}
export function setSubmitResponse(state, submitResponse) {
  state.submitResponse = submitResponse
}
export function updateContent(state, payload) {
  for (const i in state.qStudents) {
    if (state.qStudents[i].id === payload.id) {
      state.qStudents[i] = payload;
      break;
    }
  }
}
