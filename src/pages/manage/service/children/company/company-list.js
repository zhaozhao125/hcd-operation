import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'

const companyList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.COMPANY_LIST, params, 'post', {})
}

const addCompany = params => {
  return fetch(api.ADD_COMPANY, params, 'post', {})
}
const companyInfor = params => {
  return fetch(api.COMPANY_INFOR, params, 'get', {})
}
const editCompany = params => {
  return fetch(api.EDIT_COMPANY, params, 'post', {})
}

const openClose = params => {
  return fetch(api.OPEN_CLOSE, params, 'get', {})
}

const allCompanyList = params => {
  return fetch(api.ALL_COMPAMY_LIST, params, 'get', {})
}
export default {
  companyList,
  addCompany,
  companyInfor,
  editCompany,
  openClose,
  allCompanyList
}
