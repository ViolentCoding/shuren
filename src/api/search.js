/*
 * @Author: 赵新朋
 * @Date: 2020-03-12 13:55:00
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-14 15:48:22
 * @Description:
 */
import request from '@/utils/request'

export function getInfo() {
  return request({
    url: 'resume/userInfo/findAll',
    method: 'post'
  })
}

export function search(data) {
  return request({
    url: 'resume/userInfo/search',
    method: 'post',
    data
  })
}

export function getuserInfo(data) {
  return request({
    url: 'resume/userInfo/getInfo',
    method: 'post',
    data
  })
}
