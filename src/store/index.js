import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
// import { getUserInfo } from '@/api/user.js'
// import { getPermission } from '@/api/home.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: '',
    permission: ['right']
  },
  mutations: {
    updateUserInfo (state, data) {
      state.userInfo = data
    },
    updatePermission (state, data) {
      state.permission = data
    },
    clearUserInfo (state) {
      state.userInfo = ''
    }
  },
  actions: {
    // 获取基础信息
    // async getPageInfo({ commit, dispatch }, payload) {
    //   const userRes = await getUserInfo()
    //   if (userRes.data) {
    //     commit('updateUserInfo', userRes.data)
    //   }
    //   const permissionInfo = await getPermission('NMP')
    //   if (permissionInfo.data) {
    //     commit('updatePermission', permissionInfo.data)
    //   }
    // },
  },
  modules: {
    home
  }
})
