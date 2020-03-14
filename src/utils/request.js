/*
 * @Author: 赵新朋
 * @Date: 2020-01-08 17:42:38
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-14 14:30:43
 * @Description:
 */
import axios from 'axios'
import {
  MessageBox,
  Message,
  Loading
} from 'element-ui'
import store from '@/store'

// create an axios instance
sessionStorage.setItem('baseUrl', process.env.VUE_APP_BASE_API)
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000 // request timeout
})
let serviceAccout = 0
let boxloading
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// request interceptor
service.interceptors.request.use(
  config => {
    serviceAccout++
    if (serviceAccout > 0) {
      boxloading = Loading.service({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      })
    }
    // do something before request is sent
    const token = window.sessionStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    serviceAccout--
    if (serviceAccout <= 0) {
			 boxloading.close()
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      if (res.code === 702) {
        // to re-login
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        Message({
          message: res.msg || '请求失败',
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || '请求失败!'))
    } else {
      return res
    }
  },
  error => {
    serviceAccout--
    if (serviceAccout <= 0) {
      boxloading.close()
    }
    console.log('err' + error) // for debug
    Message({
      message: error.msg || '网络异常',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
