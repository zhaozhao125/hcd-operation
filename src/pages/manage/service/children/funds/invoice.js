import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'
import { download } from '@/utils/common'
import axios from 'axios'
import baseUrl from '@/config/base-url'
import { Message, Loading } from 'element-ui'

/**
 * 资金流水：1. 账户余额
 */

const manageInvoiceList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.MANAGE_INVOICE_LIST, params, 'post', {})
}
const manageFlowList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.MANAGE_FLOW_LIST, params, 'post', {})
}
const manageInvoiceInfor = (params = {}) => {
  return fetch(api.MANAGE_INVOICE_INFOR, params, 'post', {})
}
const manageInvoiceHnadel = (params = {}) => {
  return fetch(api.MANAGE_INVOICE_HANDEL, params, 'post', {})
}
export default {
  manageInvoiceList,
  manageInvoiceInfor,
  manageFlowList,
  manageInvoiceHnadel
}
