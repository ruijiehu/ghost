import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(Router)

const router = new Router({
  routes,
  mode: 'hash'
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (!store.state.userInfo || store.state.permission.length === 0) {
      // await store.dispatch('getPageInfo')
      next()
    } else {
      next()
    }
  }
})

router.afterEach((to) => {
  window.scrollTo(0, 0)
})

router.onError((err) => {
  console.log(err)
})
export default router
