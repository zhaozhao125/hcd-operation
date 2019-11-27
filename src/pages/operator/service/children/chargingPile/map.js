import { fetch } from '@/utils/fetch'
import api from '@operator/service/api/'

let getDispatchList = (obj, isLoading, isFullScreen) => {
  return fetch(api.GET_DISPATCHLIST, obj, 'get', null)
}

let getDispatchDetail = obj => {
  return fetch(api.GET_DISPATCHDETAIL, obj, 'get', {})
}

export default {
  getDispatchList,
  getDispatchDetail
  // getRatchetUsers,
  // getPersonList
}
