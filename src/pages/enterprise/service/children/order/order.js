import { fetch } from '@/utils/fetch'
import api from '@enterprise/service/api/'
import { Message, Loading } from 'element-ui'
import { download } from '@/utils/common'
import axios from 'axios'
import baseUrl from './../../../config/base-url'

let loadingStyle = {
  text: '加载中...',
  spinner: 'el-icon-loading',
  background: 'rgba(255,255,255,0.7)',
  target: '.tabs>.el-tabs__content .el-tab-pane:not([aria-hidden])'
}
const orderList = params => {
  return fetch(api.ORDER_LIST, params, 'post', {})
}

const closeOrder = params => {
  return fetch(
    api.CLOSE_ORDER,
    params,
    'post', {}, {
      requestBodyType: 'formData'
    }
  )
}

const orderInfo = orderSn => {
  return fetch(
    api.ORDER_INFO, {
      orderSn
    },
    'get', {}
  )
}

const chargeStatus = params => {
  return fetch(
    api.CHARGE_STATUS,
    params,
    'post', {}, {
      requestBodyType: 'formData'
    }
  )
}

const orderExport = (params, accessToken, fileName, dis) => {
  postAjax(params, accessToken, fileName, dis)
}

function postAjax(params, accessToken, fileName, dis) {
  let loading = Loading.service({ ...loadingStyle
  })
  axios({
    baseURL: baseUrl || '/',
    method: 'post',
    url: dis,
    data: params,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      accessToken: accessToken
    }
  })
    .then(res => {
      Message.success('导出数据成功')
      download(fileName, res.data)
      loading.close()
    })
    .catch(error => {
      Message.warning(error.msg ? error.msg : '导出失败')
      loading.close()
    })
}

const allOperators = params => {
  return fetch(api.ALL_OPERATORS, params, 'get', {})
}

const allStations = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.ALL_STATIONS, params, 'post', {})
}

export default {
  orderList,
  closeOrder,
  orderInfo,
  chargeStatus,
  orderExport,
  allOperators,
  allStations
}
