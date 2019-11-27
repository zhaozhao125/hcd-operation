import { fetch } from '@/utils/fetch'
import api from '@operator/service/api/'

const operatorInfor = params => {
  return fetch(api.OPERATOR_INFOR, params, 'get', {})
}
const complateInformation = params => {
  return fetch(api.COMPLATE_INFORMATION, params, 'post', {})
}

const bankInformation = params => {
  return fetch(api.BANK_INFORMATION, params, 'get', {})
}

const moneyInformation = params => {
  return fetch(api.MONEY_INFORMATION, params, 'post', {})
}
export default {
  operatorInfor,
  complateInformation,
  bankInformation,
  moneyInformation
}
