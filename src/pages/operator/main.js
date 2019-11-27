// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from './router'
import store from './store'
// 引入时间过滤器
import '@/utils/date-filter'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

// 引入ElementUI
import '~/theme/index.css' // 自定义主题
import ElementUI from 'element-ui'
// import '@/assets/sass/element-vars.scss'

// 引入高德地图
import VueAMap, { lazyAMapApiLoaderInstance } from 'vue-amap'

// 引入自定义全局组件
import vPage from '@/components/page/'
import vSearch from '@/components/search'
import vForm from '@/components/form'

import moment from 'moment'

// 请求发送服务
import dataService from './service/'
import $http from '@/utils/fetch.js'

// 引入本地化存储接口
import localforage from 'localforage'

import baseURL from './config/base-url'

// 引入icon
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

Vue.use(ElementUI)

// 使用高德地图
Vue.use(VueAMap)
Vue.component(CollapseTransition.name, CollapseTransition)
VueAMap.initAMapApiLoader({
  // key: '160cab8ad6c50752175d76e61ef92c50',
  key: '0baab0c23753891e3c3186ef502fd711',
  v: '1.4.2',
  // plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  plugin: [
    'Scale',
    'Geolocation',
    'AdvancedInfoWindow',
    'Geocoder',
    'PathSimplifier',
    'AMap.MouseTool',
    'AMap.OverlayGroup'
  ],
  uiVersion: '1.0' // 版本号
})
// 高德UI组件加载失败提示
lazyAMapApiLoaderInstance.load().then(() => {
  ;(function fixUI() {
    if (window.AMapUI) {
      let tmpFunc = window.AMapUI.loadUI
      window.AMapUI.loadUI = function(unames, cb) {
        tmpFunc(unames, function() {
          let args = [...arguments]
          if (args.some(item => !item)) {
            alert('地图组件加载失败，请刷新浏览器后重试')
          } else {
            cb.call(window, ...args)
          }
        })
      }
    } else {
      setTimeout(() => {
        fixUI()
      }, 50)
    }
  })()
})

Vue.use(vPage)
Vue.use(vSearch)
Vue.use(vForm)

$http.config({
  baseURL,
  store
})
Vue.use($http)
Object.defineProperty(Vue.prototype, '$service', {
  value: dataService,
  writable: false
})

Object.defineProperty(Vue.prototype, 'localforage', {
  value: localforage,
  writable: false
})

Vue.prototype.$_has = value => {
  return store.getters.buttonAuthSet.has(value)
}

// 判断按钮权限指令
Vue.directive('has', {
  bind: function(el, binding, vnode) {
    if (!Vue.prototype.$_has(binding.value)) {
      if (el.parentNode && el.parentNode.removeChild) {
        Vue.prototype.$nextTick(() => {
          el.parentNode.removeChild(el)
        })
      }
    }
  }
})

// 时间格式化过滤器
Vue.filter('timeFilter', function(value, format) {
  if (!format) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  if (!isNaN(value)) {
    if (String(value).length === 10) {
      return moment.unix(value).format(format)
    } else if (String(value).length === 13) {
      return moment(value).format(format)
    } else {
      return '暂无'
    }
  }
  let date = new Date(value)
  if (!isNaN(date.getTime())) {
    return moment(value).format(format)
  }
  return '暂无'
})

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

// 页面刷新自动登录
if (sessionStorage.getItem('loginData')) {
  let loginData = JSON.parse(sessionStorage.getItem('loginData'))
  if (loginData.type == 'operator') {
    store.commit('login', loginData)
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
