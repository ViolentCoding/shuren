import {getList} from '@/api/currency'
const state = {
  cityList:[],
  myinfoStatus:true,
  editqsinfo:false,
}
const mutations = {
	set_info(state, val) {
	  state.info = val
	},
  set_select(state, val) {
    state.select = val
  }
 
  
}

const actions = {
  getList({commit,state},data) {
    return new Promise((resolve, reject) => {
      getList(data).then((res) => {
        resolve(res)
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
