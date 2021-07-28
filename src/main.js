import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import './styles/theme/index.css'
import * as filters from '@/config/filters'
// 全局过滤器设置
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
