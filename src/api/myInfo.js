import request from '@/utils/request'

export function getSelect(data) {
  return request({
    url: '/companyInfo/industry/getList',
    method: 'get',
    data
  })
}

export function getCity(data) {
  return request({
    url: '/companyInfo/industry/pcarea',
    method: 'get',
    data
  })
}
