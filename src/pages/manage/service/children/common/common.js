import {
  fetch
} from '@/utils/fetch'
import api from '@manage/service/api/'

const getUpToken = () => {
  return fetch(api.GET_UP_TOKEN, null, 'get')
}

export default {
  getUpToken
}
