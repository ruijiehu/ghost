
import store from '@/store/index'

export default {
  install (Vue) {
    Vue.directive('has', {
      async bind (el, binding) {
        const permissionCode = binding.value
        const permissionList = store.state.permission

        if (permissionList && permissionList.length && permissionList.indexOf(permissionCode) === -1) {
          Vue.prototype.$nextTick(() => {
            el.parentNode.removeChild(el)
          })
        }
      }
    })
  }
}
