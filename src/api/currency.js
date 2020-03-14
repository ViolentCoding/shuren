import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/companyInfo/companyInfo',
    method: 'post',
    data
  })
}
