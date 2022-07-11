import axios from "axios";

export async function getQStudents(context) {
  await new Promise((res) => setTimeout(() => res(), 2000));
  try {
    const response = await axios.get('http://localhost:8080/api/list');
    for (const item of response.data) {
      item.published = item.published ? 'Published' : 'Pending'
    }
    console.log('records: ', response.data)
    context.commit('setQStudents', response.data)
  } catch (err) {
    console.log(err);
  }
}

export async function saveContent(context, payload) {
  return await axios.post('http://localhost:8080/api/list', payload)
    .then((response) => {
      context.commit('setSubmitResponse', response.status)
      let res = response
      console.log('status: ', res)
      return res
    })
    .catch((e) => {
      console.log('uy: ', e.message)
      context.commit('setSubmitResponse', e.message);
      return e.message
    });
}

export async function saveEditContent(context, payload) {
  console.log('id: ', payload.id)
  return await axios.put(`http://localhost:8080/api/list/${payload.id}`, payload)
    .then((response) => {
      context.commit("updateContent", response.data);
      context.commit('setSubmitResponse', response.status)
      let res = response
      return res
    })
    .catch((e) => {
      context.commit('setSubmitResponse', e.message);
      return e.request.status
    });
}

export async function confirmDeleteRecord(context, payload) {
  console.log('pay: ', payload)
  await axios.delete(`http://localhost:8080/api/list/${payload.id}`)
    .then((response) => {
      context.commit('setSubmitResponse', response.status)
    })
    .catch((e) => {
      context.commit('setSubmitResponse', e.message);
      return e.request.status
    });
}
