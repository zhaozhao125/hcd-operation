import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'

// 账户列表
const getAccountList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.ACCOUNT_LIST, params, 'post', {})
}
const add_account = obj => {
  return fetch(api.ADD_ACCOUNT, obj, 'post')
}
const edit_account = obj => {
  return fetch(api.EDIT_ACCOUNT, obj, 'post')
}

const reset_password = obj => {
  return fetch(api.RESET_PASSWORD, obj, 'post')
}

export default {
  getAccountList, // 账户列表
  add_account, // 添加账户
  edit_account, // 编辑账户
  reset_password
}
