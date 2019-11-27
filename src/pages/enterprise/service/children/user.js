import {
  fetch
} from '@/utils/fetch'
import api from '../api/'

function login(username, password) {
  return fetch(api.LOGIN, {
    username,
    password
  }, 'post')
}

const getUserInfo = () => {
  return fetch(api.GET_USER_INFO, null, 'post', {})
}

const updateSelfInfo = (params) => {
  return fetch(api.UPDATE_SELF_INFO, params, 'post', {})
}

const changePassword = (newPassword, oldPassword) => {
  return fetch(api.CHANGE_PASSWORD, {
    newPassword,
    oldPassword
  }, 'post')
}
export default{
  login,
  getUserInfo,
  updateSelfInfo,
  changePassword
}
