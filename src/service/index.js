import {
  fetch
} from '@/utils/fetch'

/**
 * 获取城市列表
 */
function getCityList() {
  return fetch('/common/service/allCity', null, 'get')
}

export default {
  getCityList
}
