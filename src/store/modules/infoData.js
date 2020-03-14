import { getSelect ,getCity } from '@/api/myInfo'
const state = {
  select:{
	  industryTypes:[],
	  companyNatures:[],
	  enterpriseScales:[]
  },
  cityList:[],
}
const mutations = {
  set_select(state, val) {
    state.select = val
  },
  set_city(state, val) {
    state.select = val
  },
}

const actions = {
  // 编辑回显数据
  getSelect({commit,state}) {
    return new Promise((resolve, reject) => {
      getSelect().then((res) => {
        commit('set_select', res.result)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getCity({commit,state}) {
    return new Promise((resolve, reject) => {
      getCity().then((res) => {
        commit('set_city', res.result)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
