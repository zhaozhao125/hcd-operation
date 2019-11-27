import { fetch } from '@/utils/fetch'
import api from '@operator/service/api/'

const getUpToken = () => {
  return fetch(api.GET_UP_TOKEN, null, 'get')
}
const allCompanyList = params => {
  return fetch(api.ALL_COMPAMY_LIST, params, 'get', {})
}
export default {
  getUpToken,
  allCompanyList
}
