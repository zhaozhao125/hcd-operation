import {
  fetch
} from '@/utils/fetch'
import api from '@enterprise/service/api/'

const getEnterpriseInfo = params => {
  return fetch(api.ENTERPRISE_INFO, params, 'post', {})
}

export default {
  getEnterpriseInfo
}
