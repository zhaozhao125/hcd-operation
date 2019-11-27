import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'

let getDispatchList = (obj, isLoading, isFullScreen) => {
  return fetch(api.GET_DISPATCHLIST, obj, 'get', null)
}
let getDispatchDetail = id => {
  return fetch(`${api.GET_DISPATCHDETAIL}/${id}`, null, 'get')
}

const getChargingPileList = params => {
  return fetch(
    api.GETCHARGINGPILELIST,
    params,
    'post',
    {},
    {
      defaultCity: {
        name: 'cityId'
      }
    }
  )
}

const getChargingPileInfo = params => {
  return fetch(api.GETCHARGINGPILEINFO, params, 'get', {})
}

const chargingPileEdit = params => {
  return fetch(api.CHARGINGPILEEDIT, params, 'post', {})
}

const chargingPileAdd = params => {
  return fetch(api.CHARGINGPILEADD, params, 'post', {})
}

const chargingPileUpgrade = params => {
  return fetch(api.CHARGINGUPGRADE, params, 'post', {})
}

const chargingPileStatus = params => {
  return fetch(api.CHARGINGPILESTATUS, params, 'post', {})
}

const getChargingPileGenre = params => {
  return fetch(api.GETCHARGINGPILEGENRE, params, 'get', {})
}

export default {
  getChargingPileList,
  getChargingPileInfo,
  chargingPileEdit,
  chargingPileAdd,
  chargingPileStatus,
  getChargingPileGenre,
  chargingPileUpgrade,
  getDispatchList,
  getDispatchDetail
}
