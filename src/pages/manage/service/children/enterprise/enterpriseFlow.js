import {
  fetch
} from '@/utils/fetch'
import api from '@manage/service/api/'

const getEnterpriseFlowList = (params) => {
  return fetch(api.ENTERPRISE_FLOW_LIST, params, 'post', {})
}

const getEnterpriseFlowSubjects = (params) => {
  return fetch(api.ENTERPRISE_FLOW_SUBJECTS, params, 'post', {})
}

export default {
  getEnterpriseFlowList,
  getEnterpriseFlowSubjects
}
