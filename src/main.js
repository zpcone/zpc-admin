import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
// import echarts from 'echarts'

import '@/icons' // icon
import '@/asyncRoute'
import '@/permission' // permission control ---路由的钩子函数进行路由控制

// 设置语言
Vue.use(ElementUI, { locale })

Vue.config.silent = true

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
