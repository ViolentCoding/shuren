/*
 * @Author: 赵新朋
 * @Date: 2020-03-12 16:16:48
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-13 10:12:20
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import infoData from './modules/infoData'
import search from './modules/search'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
	 permission,
   infoData,
   search
  },
  getters
})

export default store
