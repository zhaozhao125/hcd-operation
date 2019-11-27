import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'
import { handleDate } from '@/utils/date-filter'

const formateCharingOrderPrice = row => {
  console.dir(formateCharingOrderPrice)
  if (row.online) {
    row.connectorId =
      row.connectorId + '<span style="color: green;">在线</span>'
  } else {
    row.connectorId = row.connectorId + '<span style="color: red;">离线</span>'
  }

  if (row.prices.length > 0) {
    let tmp = []
    for (let idx in row.prices) {
      tmp[idx] =
        '电费' +
        row.prices[idx].elecPrice +
        '元/度, 服务费' +
        row.prices[idx].servicePrice +
        '元/度' +
        ' ,站位费' +
        row.parkingPrice +
        '元/小时'
    }

    row.prices = tmp.join('<br />')
  } else {
    row.prices = ''
  }

  let endTime = new Date()
  if (Number.parseInt(row.endTime) > 0) {
    endTime.setTime(row.endTime)
    row.endTime = handleDate(endTime)
  } else {
    row.endTime = ''
  }

  row.totalMoney = '<span style="color:red;">' + row.totalMoney + '元</span>'

  if (row.parkingPrice > 0) {
    row.parkingMoney =
      row.parkingMoney +
      '元（' +
      (row.parkingMoney / row.parkingPrice).toFixed(2) +
      '小时）'
  } else {
    row.parkingMoney = row.parkingMoney + '元'
  }
  // row.parkingMoney = row.parkingMoney + '元（1小时）';
  return row
}

const getAllChargePileNetworks = params => {
  return fetch(api.getAllChargePileNetworks, params, 'get', {})
}

const getChargingPileNetworkDetial2Edit = params => {
  console.dir('getChargingPileNetworkDetial2Edit')
  return fetch(api.getChargingPileNetworkDetial2Edit, params, 'get', {})
}

export default {
  getChargingPileNetworkDetial2Edit,
  getAllChargePileNetworks
}
