/*
 * @Author: 赵新朋
 * @Date: 2020-03-12 14:36:24
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-12 14:56:45
 * @Description:
 */
import { search } from '@/api/search'
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
    const { loginName, password, captch } = info
    return new Promise((resolve, reject) => {
      search({ loginName: loginName.trim(), password: password, phone: captch }).then(response => {
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
