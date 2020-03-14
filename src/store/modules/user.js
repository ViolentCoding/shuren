/*
 * @Author: 赵新朋
 * @Date: 2020-03-11 17:13:47
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-14 09:39:25
 * @Description:
 */
import { login, getCaptch, registerCaptch, register, logout, getInfo } from '@/api/user'
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
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  LOGIN: (state, info) => {
    state.info = info
  },
  LOGOUT: (state) => {
    state.info = ''
  }
}

const actions = {
  // user login
  login({ commit }, info) {
    commit('LOGIN', info)
    console.log(info)
    window.sessionStorage.setItem('loginName', info.loginName)
    const { loginName, password, captch } = info
    return new Promise((resolve, reject) => {
      login({ loginName: loginName.trim(), password: password, phone: captch }).then(response => {
        commit('SET_TOKEN', response.result.sessionId)
        setToken(response.result.sessionId)
        console.log(response)
        window.sessionStorage.setItem('state',response.result.sysUser.state)
        window.sessionStorage.setItem('id', response.result.sysUser.id)
        window.sessionStorage.setItem('status', response.result.sysUser.status)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取验证码
  getCaptch({ commit }, info) {
    return new Promise((resolve, reject) => {
      getCaptch({ phone: info }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 注册验证码
  registerCaptch({ commit }, info) {
    return new Promise((resolve, reject) => {
      registerCaptch({ phone: info }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 注册
  register({ commit }, info) {
    const { loginName, password, captch } = info
    return new Promise((resolve, reject) => {
      register({ loginName: loginName.trim(), password: password, phone: captch }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit }) {
	    resetRouter()
	  commit('LOGOUT')
	 window.sessionStorage.clear('userId')
	 window.sessionStorage.clear('userName')
	 window.sessionStorage.clear('token')
	 window.sessionStorage.clear('role')
  },

  // remove token
  resetToken({ commit }) {
	    resetRouter()
    commit('LOGOUT')
    window.sessionStorage.clear('userId')
    window.sessionStorage.clear('userName')
    window.sessionStorage.clear('token')
	 window.sessionStorage.clear('role')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

