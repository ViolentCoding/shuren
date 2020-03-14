/*
 * @Author: 赵新朋
 * @Date: 2020-01-08 17:42:38
 * @LastEditors  : 赵新朋
 * @LastEditTime : 2020-01-09 16:37:56
 * @Description: 
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
//自定义主题
import './styles/theme/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

