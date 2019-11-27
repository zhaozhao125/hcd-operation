import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import navStore from '@/store/modules/nav-store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    navStore
  }
})
