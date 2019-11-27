import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import mainPage from './views/main/main-page'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: resolve => require(['./views/user/login/'], resolve)
  },
  {
    path: '/',
    name: 'index',
    redirect: {
      name: 'dashboard'
    }
  }, {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: '控制面板',
      requireAuth: true
    },
    component: mainPage
  }
  ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (store.getters.user) {
      // 通过vuex state获取当前的user是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
