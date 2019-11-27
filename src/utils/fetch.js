import axios from 'axios'
import baseUrl from '@/config/base-url'
import qs from 'qs' // 序列化表单数据
import { Message, Loading } from 'element-ui'

let store = null

const Axios = axios.create({
  baseURL: baseUrl || '/',
  timeout: 60000,
  responseType: 'json',
  withCredentials: false // 是否允许带cookie这些
})

let loadingStack = {}

function openLoading (loadingConfig, baseURL, url) {
  if (url && !url.match('http')) {
    url = baseURL + url
  }
  if (loadingStack[url]) {
    return
  }
  // closeLoading(url)
  loadingStack[url] = Loading.service({
    target:
      loadingConfig.target ||
      '.tabs>.el-tabs__content .el-tab-pane:not([aria-hidden])',
    lock: true,
    text: loadingConfig.text || '加载中...',
    spinner: loadingConfig.spinner || 'el-icon-loading',
    background: `rgba(255,255,255,${loadingConfig.background || 0.7})`
  })
}

function closeLoading (url) {
  if (loadingStack[url] && loadingStack[url].close) {
    loadingStack[url].close()
    delete loadingStack[url]
  }
}
// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      config.params &&
        Object.keys(config.params).forEach(item => {
          if (
            config.params[item] === null ||
            config.params[item] === undefined
          ) {
            config.params[item] = ''
          }
        })
    } else {
      config.data &&
        Object.keys(config.data).forEach(item => {
          if (config.data[item] === null || config.data[item] === undefined) {
            config.data[item] = ''
          }
        })
      // 序列化 & Content-Type
      if (
        config.requestConfig &&
        config.requestConfig.requestBodyType === 'formData'
      ) {
        config.data = qs.stringify(config.data)
        config.headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      } else {
        config.data = JSON.stringify(config.data)
        config.headers = {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }
    }
    config.headers.accessToken = store.getters.token
    if (config.loadingConfig) {
      openLoading(config.loadingConfig, config.baseURL, config.url)
    }
    return config
  },
  error => {
    Message({
      message: error,
      type: 'warning'
    })
    return Promise.reject(error)
  }
)

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    closeLoading(res.config.url)
    if (res.data.code == '0') {
      return res
    }
    if (res.data.code == '730014') {
      store.commit('logout')
      return res
    }
    // 对响应数据做些事
    if (res.data && res.data.code != 0) {
      if (!res.config.requestConfig || !res.config.requestConfig.noErrorMsg) {
        let msg = res.data.msg || res.data.message || '系统错误'
        Message({
          message: msg,
          type: 'error'
        })
      }
      return Promise.reject(res.data)
    }
    return res
  },
  error => {
    console.dir(error)
    if (
      error.response &&
      error.response.data &&
      (error.response.data.code == 800008 ||
        error.response.data.code == 800011 ||
        error.response.data.code == 730014)
    ) {
      console.log('error')
      store.commit('logout')
      return
    }
    closeLoading(error.config.url)
    let msg = ''
    try {
      msg =
        error.response.data.msg ||
        error.response.data.message ||
        '请求出错，请稍后再试'
    } catch (e) {
      msg = error.message || '请求出错，请稍后再试'
    }
    if (msg.match('timeout')) {
      msg = '请求超时，请稍后再试'
    }
    Message({
      message: msg,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: axios
    })
  },
  use: (st) => {
    store = st
  },
  config: (config) => {
    if (config.baseURL) {
      Axios.defaults.baseURL = config.baseURL
    }
    if (config.store) {
      store = config.store
    }
  }
}

/**
 * 发送ajax请求服务
 * @param  {String} url           请求URL
 * @param  {Object} data          参数，key/value格式
 * @param  {String} method        请求方法（get,post,put,patch,delete...）
 * @param  {Object} loadingConfig 加载动画配置
 *                                例如：{
 *                                  target: '.aa' // Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点
 *                                  lock: true, // 锁定屏幕的滚动
                                    text: 'Loading', // 加载提示文字
                                    spinner: 'el-icon-loading', // 加载图标
                                    opacity: 0.7 // 背景色透明度
 *                                }
 * @param  {Object} requestConfig 请求配置，如请求体类型、城市权限控制等
 * @return {Promise}
 */
export function fetch(
  url,
  data,
  method = 'post',
  loadingConfig,
  requestConfig
) {
  if (typeof method === 'object') {
    let config = method
    method = config.method || 'post'
    loadingConfig = config.loading || config.loadingConfig
    requestConfig = config.requestConfig || config
  }
  let options = {
    method,
    url,
    loadingConfig,
    requestConfig
  }
  if (data) {
    if (method.toLowerCase().match(/post|put|patch/i)) {
      options.data = data
    } else {
      options.params = data
    }
  }

  return Axios(options)
}
