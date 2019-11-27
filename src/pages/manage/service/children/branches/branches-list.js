import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'
// import { STATION_BASE_URL } from '@/config/base-url'
import { Message, Loading } from 'element-ui'
import { download } from '@/utils/common'
import axios from 'axios'
import baseUrl from '@manage/config/base-url'

let loadingStyle = {
  text: '加载中...',
  spinner: 'el-icon-loading',
  background: 'rgba(255,255,255,0.7)',
  target: '.tabs>.el-tabs__content .el-tab-pane:not([aria-hidden])'
}
const branchList = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.BRANCH_LIST, params, 'post', {})
}
let addBranch = obj => {
  return fetch(api.ADD_BRANCH, obj, 'post', {})
}

let branchInfor = obj => {
  return fetch(api.BRANCH_INFOR, obj, 'get', {})
}

let branchInforHandel = obj => {
  return fetch(api.BRANCH_INFOR_HANDEL, obj, 'get', {})
}

let editBranch = obj => {
  return fetch(api.EDIT_BRANCH, obj, 'post', {})
}

let closeBranch = obj => {
  return fetch(api.CLOSE_BRANCH, obj, 'post', {})
}

const branchExport = (params, accessToken, fileName, dis) => {
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
  branchList,
  addBranch,
  branchInfor,
  editBranch,
  closeBranch,
  branchExport,
  branchInforHandel
}
