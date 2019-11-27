import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'
import { download } from '@/utils/common'
import axios from 'axios'
import baseUrl from '@/config/base-url'
import { Message, Loading } from 'element-ui'
import { handleDate } from '@/utils/date-filter'

let loadingStyle = {
  text: '加载中...',
  spinner: 'el-icon-loading',
  background: 'rgba(255,255,255,0.7)',
  target: '.tabs>.el-tabs__content .el-tab-pane:not([aria-hidden])'
}

const post_allCouponsList = (idOrName, showLoading) => {
  let obj = {}
  obj.name = idOrName
  obj.page = 1
  obj.pageSize = 200
  return fetch(api.COUPON_LIST, obj, 'post', showLoading, {})
}
// 活动列表
const getActivityList = (params) => {
  return fetch(api.getActivityList, params, 'post', {})
}
// 格式化对应的文件
const changeDateToString = (date) => {
  return handleDate(date, 'day')
}
const addFullReturnRow = (rows) => {
  return fetch(api.addFullReturnRow, rows, 'post', {})
}
const detialFullReturn = (params) => {
  return fetch(api.detialFullReturn, params, 'get', {})
}
// 格式化 满返
const detialFullReturnFormate = (row) => {
  row.startTime = handleDate(new Date(row.startTime), 'day')
  row.endTime = handleDate(new Date(row.endTime), 'day')
  row.timeText = row.startTime + ' 00:00:00 至 ' + row.endTime + ' 23:59:59'
  row.activityTime = [row.startTime, row.endTime]
  row.cycleTypeText = row.cycleType == 'month' ? '按自然月' : '按自然周'
  // 优惠券格式化
  if (row.coupons) {
    for (let idx in row.coupons) {
      row.coupons[idx].couponNameNew = row.coupons[idx].couponName
    }
  }

  row.priceCfg = row.coupons
  row.limitAmountText = row.limitAmount + '元'

  return row
}
// 格式化 新用户注册
const detialRechargingFormate = (row) => {
  row.startTime = handleDate(new Date(row.startTime), 'day')
  row.endTime = handleDate(new Date(row.endTime), 'day')

  row.timeText = row.startTime + ' 00:00:00 至 ' + row.endTime + ' 23:59:59'
  row.activityTime = [row.startTime, row.endTime]
  let idx = 0

  if (row.rules) {
    for (idx in row.rules) {
      row.rules[idx].cloumn1 = row.rules[idx].stepAmount
      row.rules[idx].cloum5 = row.rules[idx].content
      row.rules[idx].cloumn2 = row.rules[idx].coupons
    }
  }

  row.priceCfg = row.coupons
  return row
}
// 格式化 充送
const detialNewUserFormate = (row) => {
  row.startTime = handleDate(new Date(row.startTime), 'day')
  row.endTime = handleDate(new Date(row.endTime), 'day')

  row.timeText = row.startTime + ' 00:00:00 至 ' + row.endTime + ' 23:59:59'
  row.activityTime = [row.startTime, row.endTime]

  row.useInvitationCodeText = row.useInvitationCode ? '是' : '否'

  // 优惠券格式化
  if (row.coupons) {
    for (let idx in row.coupons) {
      row.coupons[idx].couponNameNew = row.coupons[idx].couponName
    }
  }

  row.priceCfg = row.coupons

  return row
}
const formateListRow = (rows) => {
  for (let idx in rows) {
    rows[idx].startTime = handleDate(new Date(rows[idx].startTime), 'day')
    rows[idx].endTime = handleDate(new Date(rows[idx].endTime), 'day')
  }
  return rows
}

// 设置活动状态
const changeRowStatus = (rows) => {
  return fetch(api.changeRowStatus, rows, 'post', {})
}
// 设置活动状态
const delRow = (rows) => {
  return fetch(api.delRow, rows, 'post', {})
}
// 设置活动状态
const addFullReductionCoupons = (rows) => {
  return fetch(api.addFullReductionCoupons, rows, 'post', {})
}
// 设置活动状态
const removeFullReductionCoupons = (rows) => {
  return fetch(api.removeFullReductionCoupons, rows, 'post', {})
}
// 设置活动状态
const activityEdit = (rows) => {
  return fetch(api.activityEdit, rows, 'post', {})
}
// 添加 新用户注册优惠券
const addNewuserCoupons = (rows) => {
  return fetch(api.addNewuserCoupons, rows, 'post', {})
}
// 删除 新用户注册优惠券
const delNewuserCoupons = (rows) => {
  return fetch(api.delNewuserCoupons, rows, 'post', {})
}
// 营销活动--充送--添加规则的优惠券
const addRuleCoupons = (rows) => {
  return fetch(api.addRuleCoupons, rows, 'post', {})
}
// 营销活动--充送--删除规则
const delRuleCoupons = (rows) => {
  return fetch(api.delRuleCoupons, rows, 'post', {})
}
// 营销活动--充送--删除规则
const saveRechargingActivity = (rows) => {
  return fetch(api.delRuleCoupons, rows, 'post', {})
}
// 广告--创建广告
const addAdvertising = (rows) => {
  return fetch(api.addAdvertising, rows, 'post', {})
}
// 广告--分页查询
const getAdvertisingList = (rows) => {
  return fetch(api.getAdvertisingList, rows, 'post', {})
}
// 广告--分页查询
const switchAddStatus = (rows) => {
  return fetch(api.switchAddStatus, rows, 'post', {})
}
// 广告--分页查询
const deleteAdvertising = (rows) => {
  return fetch(api.deleteAdvertising, rows, 'post', {})
}
// 广告--分页查询
const editAdvertising = (rows) => {
  return fetch(api.editAdvertising, rows, 'post', {})
}
const formateRules = (row) => {
  for (let idx in row) {
    row[idx].content = row[idx].cloum5
    row[idx].stepAmount = row[idx].cloumn1
    row[idx].coupons = row[idx].cloumn2
  }
  console.log('---')
  return row
}

export default {
  post_allCouponsList,
  getActivityList,
  changeDateToString,
  addFullReturnRow,
  detialFullReturn,
  detialFullReturnFormate,
  detialNewUserFormate,
  detialRechargingFormate,
  changeRowStatus,
  delRow,
  addFullReductionCoupons,
  removeFullReductionCoupons,
  activityEdit,
  addNewuserCoupons,
  delNewuserCoupons,
  addRuleCoupons,
  delRuleCoupons,
  saveRechargingActivity,
  formateRules,
  formateListRow,
  addAdvertising,
  getAdvertisingList,
  switchAddStatus,
  deleteAdvertising,
  editAdvertising
}
