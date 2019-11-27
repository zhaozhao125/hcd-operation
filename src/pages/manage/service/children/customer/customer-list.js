import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'

const customerList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.CUSTOMER_LIST, params, 'post', {})
}
let customerInfor = params => {
  return fetch(api.CUETOMER_INFOR, params, 'post', {})
}

let customerHandel = params => {
  return fetch(api.CUSTOMER_HANDEL, params, 'post', {})
}

let sendCoupon = params => {
  return fetch(api.SEND_COUPON, params, 'post', {})
}

let isAssignedCoupons = params => {
  return fetch(api.USABLE_COUPON_LIST, params, 'post', {})
}

let userCouponAmount = params => {
  return fetch(api.USER_COUPON_AMOUNT, params, 'post', {})
}

let deleteUserCoupon = params => {
  return fetch(api.USER_DELETE_COUPON, params, 'post', {})
}

let resetUserName = params => {
  return fetch(api.RESET_USER_NAME, params, 'post', {})
}
const userCouponList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.USER_COUPON_LIST, params, 'post', {})
}
export default {
  customerList,
  customerInfor,
  customerHandel,
  sendCoupon,
  isAssignedCoupons,
  userCouponList,
  userCouponAmount,
  deleteUserCoupon,
  resetUserName
}
