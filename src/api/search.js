/*
 * @Author: 赵新朋
 * @Date: 2020-03-12 13:55:00
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-12 17:17:30
 * @Description:
 */
import request from '@/utils/request'

export function getInfo() {
  return request({
    url: 'resume/userInfo/findAll',
    method: 'get'
  })
}

export function search() {
  return request({
    url: 'resume/userInfo/getCity',
    method: 'get'
  })
}
