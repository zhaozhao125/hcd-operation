import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'

/**
 * 资金流水：1. 账户余额
 */

const manageEnterpriseInvoiceList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.MANAGE_ENTERPRISE_INVOICE_LIST, params, 'post', {})
}
const manageEnterpriseFlowList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.MANAGE_ENTERPRISE_FLOW_LIST, params, 'post', {})
}

const manageEnbleInvoice = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.MANAGE_ENBLE_INVOICE, params, 'post', {})
}
const manageEnterpriseInvoiceInfor = (params = {}) => {
  return fetch(api.MANAGE_ENTERPRISE_INVOICE_INFOR, params, 'post', {})
}

const manageSearchCompany = (params = {}) => {
  return fetch(api.MANAGE_SEARCH_COMPANY, params, 'post', {})
}

const manageRemoteCompany = (params = {}) => {
  return fetch(api.MANGE_REMOTE_COMPANY, params, 'post', {})
}

const manageGetInvoice = (params = {}) => {
  return fetch(api.MANGE_GET_INVOICE, params, 'post', {})
}
export default {
  manageEnterpriseInvoiceList,
  manageEnterpriseInvoiceInfor,
  manageEnterpriseFlowList,
  manageSearchCompany,
  manageRemoteCompany,
  manageGetInvoice,
  manageEnbleInvoice
}
