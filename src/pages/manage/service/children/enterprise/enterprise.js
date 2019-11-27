import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'

const getEnterpriseList = (params) => {
  return fetch(api.ENTERPRISE_LIST, params, 'post', {})
}

const createEnterprise = (params) => {
  return fetch(api.ENTERPRISE_CREATE, params, 'post', {})
}

const updateEnterprise = (params) => {
  return fetch(api.ENTERPRISE_UPDATE, params, 'post', {})
}

const enterpriseDetails = (params) => {
  return fetch(api.ENTERPRISE_INFO, params, 'post', {})
}

const enterpriseOpen = (params) => {
  return fetch(api.ENTERPRISE_OPEN, params, 'post', {})
}

const enterpriseClosed = (params) => {
  return fetch(api.ENTERPRISE_CLOSED, params, 'post', {})
}

const enterpriseCharge = (params) => {
  return fetch(api.ENTERPRISE_CHARGE, params, 'post', {}, {
    requestBodyType: 'formData'
  })
}

const enterpriseRefund = (params) => {
  return fetch(api.ENTERPRISE_REFUND, params, 'post', {}, {
    requestBodyType: 'formData'
  })
}

export default {
  getEnterpriseList,
  createEnterprise,
  updateEnterprise,
  enterpriseDetails,
  enterpriseOpen,
  enterpriseClosed,
  enterpriseCharge,
  enterpriseRefund
}
