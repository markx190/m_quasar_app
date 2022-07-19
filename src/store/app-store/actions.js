import { LocalStorage } from 'quasar'
import AuthService from '../../services/auth.service';
import axios from "axios";

export async function register(context, user) {
  return await AuthService.register(user)
    .then((response) => {
      console.log('message: ', response)
      context.commit('registerSuccess', response.data);
      context.commit('regResponse', response.data.message);
      let resStatus = response.request.status
      console.log('resStatus: ', resStatus)
      resStatus === 200 ? context.commit('isSuccess', true) : null
      return response.data
    })
    .catch((error) => {
      console.log('error: ', error.response.data.message)
      context.commit('regResponse', error.response.data.message);
      context.commit('isSuccess', false)
      return error
    })
}
export async function login(context, user) {
  return await AuthService.login(user)
    .then((user) => {
      const localUser = LocalStorage.getItem('user')
      context.commit('setCurrentUser', localUser)
      context.commit('setLoggedIn')
      return user
    })
    .catch((error) => {
      console.log('login error: ', error.response.data.message)
      context.commit('authResponse', error.response.data.message);
      context.commit('loginFailure')
      return error
    })
}

export async function logout(context, user) {
  return await AuthService.logout(user)
    .then((user) => {
      context.commit('setCurrentUser', null)
      context.commit('logOutUser')
      return user
    })
    .catch((error) => {
      return error
    })
}

export async function getQProjects(context) {
  await new Promise((res) => setTimeout(() => res(), 2000));
  try {
    const response = await axios.get('http://localhost:8080/api/list_of_projects')
    for (const item of response.data) {
      item.status = item.status ? 'Deployed' : 'In Progress'
    }
    console.log('projects: ', response.data)
    context.commit('setQProjects', response.data)
    return response
  } catch (err) {
    console.log(err);
    context.commit('setPageStatus', 'Network Error')

  }
}

export async function getSingleProject(context, payload) {
  console.log('payload: ', payload)
  await new Promise((res) => setTimeout(() => res(), 2000));
  try {
    const response = await axios.get(`http://localhost:8080/api/list_of_projects/${payload.id}`)
    console.log('projects: ', response.data.id)
    context.commit('setSingleProject', response.data)
    return response.data.id
  } catch (err) {
    console.log(err);
    context.commit('setPageStatus', 'Network Error')

  }
}

export async function saveProject(context, payload) {
  return await axios.post('http://localhost:8080/api/list_of_projects', payload)
    .then((response) => {
      context.commit('setSubmitStatus', response.status)
      let res = response
      console.log('status: ', res)
      return res
    })
    .catch((e) => {
      console.log('uy: ', e.request)
      context.commit('setSubmitStatus', e.message);
      return e.message
    });
}

export async function saveEditProject(context, payload) {
  console.log('id: ', payload.id)
  return await axios.put(`http://localhost:8080/api/list_of_projects/${payload.id}`, payload)
    .then((response) => {
      context.commit("updateProject", response.data);
      context.commit('setSubmitStatus', response.status)
      let res = response
      return res
    })
    .catch((e) => {
      context.commit('setSubmitStatus', e.message);
      return e.request.status
    });
}

export async function confirmDeleteProject(context, payload) {
  console.log('pay: ', payload)
  await axios.delete(`http://localhost:8080/api/list_of_projects/${payload.id}`)
    .then((response) => {
      context.commit('setSubmitStatus', response.status)
    })
    .catch((e) => {
      context.commit('setSubmitStatus', e.message);
      return e.request.status
    });
}
