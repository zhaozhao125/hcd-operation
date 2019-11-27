import { fetch } from '@/utils/fetch'
import api from '@operator/service/api/'
import { Message, Loading } from 'element-ui'
import { download } from '@/utils/common'
import axios from 'axios'
import baseUrl from '@operator/config/base-url'

let loadingStyle = {
  text: '加载中...',
  spinner: 'el-icon-loading',
  background: 'rgba(255,255,255,0.7)',
  target: '.tabs>.el-tabs__content .el-tab-pane:not([aria-hidden])'
}

const pileList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.CHARGING_PILE_LIST, params, 'post', {})
}

const getAllChargePileNetworks = params => {
  return fetch(api.GETAllCHARGEPILENETWORKS, params, 'get', {})
}
const remoteStation = params => {
  return fetch(api.REMOTE_STATION, params, 'get', {})
}

const addPile = params => {
  return fetch(api.ADD_PILE, params, 'post', {})
}

const pileInfor = params => {
  return fetch(api.PILE_INFOR, params, 'get', {})
}

const editPile = params => {
  return fetch(api.CHARGING_PILE_EDEIT, params, 'post', {})
}

const pileExport = (params, accessToken, fileName, dis) => {
  postAjax(params, accessToken, fileName, dis)
}

function postAjax (params, accessToken, fileName, dis) {
  let loading = Loading.service({ ...loadingStyle })
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
export default {
  pileList,
  remoteStation,
  addPile,
  pileInfor,
  editPile,
  pileExport,
  getAllChargePileNetworks
}
