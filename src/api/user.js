/*
 * @Author: 赵新朋
 * @Date: 2020-03-11 17:32:42
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-12 11:01:30
 * @Description:
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'api/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: 'companyInfo/',
    method: 'post',
    data
  })
}

export function getCaptch(data) {
  return request({
    url: 'api/getPhone',
    method: 'post',
    data
  })
}

export function registerCaptch(data) {
  return request({
    url: 'companyInfo/getPhone',
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
