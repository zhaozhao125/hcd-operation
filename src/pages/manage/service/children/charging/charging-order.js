import {
  fetch
} from '@/utils/fetch'
import api from '@manage/service/api/'

const chargingOrder = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.CHARGING_ORDER, params, 'post', {})
}

const charingInfor = params => {
  return fetch(api.CHARING_INFOR, params, 'get', {})
}

export default {
  chargingOrder,
  charingInfor
}
