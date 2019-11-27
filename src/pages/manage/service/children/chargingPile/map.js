import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'

let getDispatchList = (obj, isLoading, isFullScreen) => {
  return fetch(api.GET_DISPATCHLIST, obj, 'get', null)
}

let getDispatchDetail = obj => {
  return fetch(api.GET_DISPATCHDETAIL, obj, 'get', {})
}

let getOfflineRecord = (params = {}, page = 1, pageSize = 20) => {
  params.page = page
  params.pageSize = pageSize
  return fetch(api.OFFLINE_RECORD, params, 'get', {})
}
export default {
  getDispatchList,
  getDispatchDetail,
  getOfflineRecord
}
