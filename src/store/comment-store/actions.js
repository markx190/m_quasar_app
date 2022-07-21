import axios from "axios";

export async function getQComments(context, payload) {
  console.log('px: ', payload.id)
  // await new Promise((res) => setTimeout(() => res(), 2000));
  try {
    const response = await axios.get(`http://localhost:8080/api/list_of_forums/comments/${payload.id}`)
    console.log('comments1: ', response.data)
    context.commit('setQComments', response.data)
    return response
  } catch (err) {
    console.log(err);
    context.commit('setSubmitStatus', 'Network Error')
  }
}

export async function submitComment(context, payload) {
  return await axios.post('http://localhost:8080/api/list_of_forums', payload)
    .then((response) => {
      context.commit('setSubmitStatus', response.status)
      return response
    })
    .catch((e) => {
      console.log('uy: ', e.request)
      context.commit('setSubmitStatus', e.message);
      return e.message
    });
}

export async function confirmDeleteComment(context, payload) {
  console.log('pay: ', payload)
  await axios.delete(`http://localhost:8080/api/list_of_forums/${payload.id}`)
    .then((response) => {
      context.commit('setSubmitStatus', response.status)
    })
    .catch((e) => {
      context.commit('setSubmitStatus', e.message);
      return e.request.status
    });
}
