import { fetch } from '@/utils/fetch'
import api from '@manage/service/api/'

/**
 * 用户反馈列表
 * @param page
 * @param params
 * @returns {*}
 */
const getFeedbackList = (page, params = {}) => {
  params.page = page
  return fetch(api.Get_Feedback_List, params, 'post', {})
}

const saveUerFeedbackRemark = (params) => {
  return fetch(api.SaveUerFeedbackRemark, params, 'post', {})
}

export default {
  getFeedbackList,
  saveUerFeedbackRemark
}
