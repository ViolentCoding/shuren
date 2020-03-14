/*
 * @Author: 赵新朋
 * @Date: 2020-03-12 14:36:24
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-14 17:17:58
 * @Description:
 */
import { search, getuserInfo } from '@/api/search'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    info: ''
  }
}

const state = getDefaultState()

const mutations = {
    
}

const actions = {
  searchform({ commit }, info) {
    console.log(info)
    const { keywords, pageNo, pageSize,area} = info
    return new Promise((resolve, reject) => {
      search({ keywords:keywords.trim(),pageNo:pageNo,pageSize:pageSize,area:area}).then(response => {
        console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userInfo({commit}, info ){
    const {uid, companyId  } =info
    return new Promise((resolve, reject) => {
      getuserInfo({ uid:uid, companyId:companyId }).then(response => {
        console.log(response)
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
