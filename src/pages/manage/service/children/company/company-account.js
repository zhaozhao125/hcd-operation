import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'

const companyAccountList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.COMPANY_ACCPUNT_LIST, params, 'post', {})
}

const accountCreate = params => {
  return fetch(api.ACCOUNT_CREATE, params, 'post', {})
}
const companyResetPassword = params => {
  return fetch(api.RESET_PASSWORD, params, 'post', {})
}
const accountSetting = params => {
  return fetch(api.ACCOUNT_SETTING, params, 'post', {})
}

export default {
  companyAccountList,
  accountCreate,
  companyResetPassword,
  accountSetting
}
