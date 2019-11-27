import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'

const couponList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.COUPON_LIST, params, 'post', {})
}

const addCoupon = params => {
  return fetch(api.ADD_COUPON, params, 'post', {})
}
const companyResetPassword = params => {
  return fetch(api.RESET_PASSWORD, params, 'post', {})
}
const accountSetting = params => {
  return fetch(api.ACCOUNT_SETTING, params, 'post', {})
}

const couponDetail = params => {
  return fetch(api.COUPON_DETAILE, params, 'post', {})
}

const deleteCoupon = params => {
  return fetch(api.DELETE_COUPON, params, 'post', {})
}

const editCoupon = params => {
  return fetch(api.EDIT_COUPON, params, 'post', {})
}

const publishList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.PUBLIST_LIST, params, 'post', {})
}
export default {
  couponList,
  addCoupon,
  companyResetPassword,
  accountSetting,
  couponDetail,
  deleteCoupon,
  editCoupon,
  publishList
}
