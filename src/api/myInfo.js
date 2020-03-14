import request from '@/utils/request'

export function renzheng(data) {
  return request({
    url: '/companyInfo/authen',
    method: 'put',
    data
  })
}
export function updateInfo(data) {
  return request({
    url: '/companyInfo/update',
    method: 'put',
    data
  })
}

export function getSelect(data) {
  return request({
    url: '/companyInfo/industry/getList',
    method: 'get',
    data
  })
}

export function getInfo(data) {
	let id ='37';
  return request({
    url: `/companyInfo/getInfo/${id}`,
    method: 'get',
    data
  })
}
export function pcarea(data) {
  return request({
    url: '/companyInfo/industry/pcarea',
    method: 'get',
    data
  })
}
export function getCity(id) {
  return request({
    url: '/companyInfo/industry/getCity/'+id,
    method: 'get',
  })
}
export function getArea(id) {
  return request({
    url: '/companyInfo/industry/getArea/'+id,
    method: 'get',
  })
}
