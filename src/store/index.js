/*
 * @Author: 赵新朋
 * @Date: 2020-03-11 17:13:47
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-12 14:57:23
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import search from './modules/search'
import permission from './modules/permission'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    search,
	  permission
  },
  getters
})

export default store
