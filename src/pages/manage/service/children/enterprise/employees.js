import {
  fetch
} from '@/utils/fetch'
import api from '@manage/service/api/'

const getEmployeesList = (params) => {
  return fetch(api.EMPLOYEES_LIST, params, 'post', {})
}

const createEmployees = (params) => {
  return fetch(api.EMPLOYEES_CREATE, params, 'post', {})
}

const switchEmployeesRole = (params) => {
  return fetch(api.EMPLOYEES_ROLE, params, 'post', {})
}

const removeEmployees = (params) => {
  return fetch(api.EMPLOYEES_REMOVE, params, 'post', {})
}

const employeesResetPassword = (params) => {
  return fetch(api.EMPLOYEES_RESET_PASSWORD, params, 'post', {})
}

const employeesDetails = (params) => {
  return fetch(api.ENTERPRISE_INFO, params, 'post', {})
}

const employeesQueryAccount = (params) => {
  return fetch(api.QUERY_ACCOUNT, params, 'post', {})
}

export default {
  getEmployeesList,
  createEmployees,
  switchEmployeesRole,
  removeEmployees,
  employeesResetPassword,
  employeesDetails,
  employeesQueryAccount
}
