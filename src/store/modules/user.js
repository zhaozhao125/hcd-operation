import formatAuth, {
  buttonAuth,
  buttonAuthSet
} from '../children/format-auth.js'
import navStore from './nav-store.js'

let getSessionUser = function() {
  let ret = null
  try {
    ret = JSON.parse(sessionStorage.getItem('loginData')).adminUser
  } catch (e) {}
  return ret
}

const state = {
  navClosed: false, // 左侧导航菜单是否关闭状态
  user: null, // 当前登录用户信息
  token: null, // 当前登录用户token
  auth: null, // 当前登录用户拥有的操作权限
  allCities: [], // 所有的运营城市
  authedCities: [], // 当前登录用户拥有权限的城市
  firstCityId: null, // 当前登录用户拥有权限的第一个城市的ID
  buttonAuth: null, // 当前登录用户拥有的按钮权限（二维列表）
  buttonAuthSet: null, // 当前登录用户拥有的按钮权限（一维列表）
  invoiceFlowList: null // 开发票选择的流水号
}

const getters = {
  user: state => state.user,
  token: state => state.token,
  auth: state => state.auth,
  navClosed: state => state.navClosed,
  allCities: state => state.allCities,
  authedCities: state => state.authedCities,
  firstCityId: state => {
    let firstCity = state.authedCities.filter(item => {
      return item.value !== 999
    })[0]
    if (firstCity) {
      return firstCity.value
    }
  },
  defaultCityId: state => {
    if (state.authedCities.some(item => item.value == 999)) {
      return 999
    }
    if (state.authedCities[0]) {
      return state.authedCities[0].value
    }
  },
  buttonAuth: state => state.buttonAuth,
  buttonAuthSet: state => state.buttonAuthSet,
  invoiceFlowList: state => state.invoiceFlowList
}

const mutations = {
  login(state, loginData) {
    sessionStorage.setItem('loginData', JSON.stringify(loginData))
    state.user = loginData.adminUser
    if (loginData.type) {
      state.user.type = loginData.type
    }
    state.token = loginData.accessToken
    console.log(state.token)
    state.auth = loginData.adminRole.authUrls
    // if (!loginData.cityModels || !loginData.cityModels.length) {
    //   alert('无法获取城市数据权限，请稍后再试')
    //   sessionStorage.removeItem('loginData')
    //   sessionStorage.removeItem('tabs')
    //   window.location.reload()
    //   return
    // }
    // state.allCities = loginData.cityModels.map(item => {
    //   return {
    //     label: item.name,
    //     value: item.id
    //   }
    // })
    // state.authedCities = loginData.cityModels
    //   .filter(item => item.checked)
    //   .map(item => {
    //     return {
    //       label: item.name,
    //       value: item.id
    //     }
    //   })
    console.log('====authedCities====', state.authedCities)
    console.log('====buttonAuth====', buttonAuth)
    console.log('====buttonAuthSet====', buttonAuthSet)
    navStore.state.navs = formatAuth(state.auth)
    state.buttonAuth = buttonAuth
    state.buttonAuthSet = buttonAuthSet
  },
  logout(state, user) {
    sessionStorage.removeItem('loginData')
    sessionStorage.removeItem('tabs')
    state.user = null
    state.token = null
    state.auth = null
    location.reload()
  },
  setUser: function(state, user) {
    state.user = user
  },
  toggleNav: function(state) {
    state.navClosed = !state.navClosed
  },
  chooseFlow: function(state, invoiceFlowList) {
    console.log(invoiceFlowList)
    state.invoiceFlowList = invoiceFlowList
  }
}

export default {
  state,
  getters,
  mutations
}
