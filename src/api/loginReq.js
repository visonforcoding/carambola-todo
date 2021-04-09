import request from './request'
import qs from 'Qs'

export function login (params) {
  return request({
    url: '/user/hand-login',
    method: 'post',
    data: qs.stringify(params),
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function register (params) {
  return request({
    url: '/user/register',
    method: 'post',
    data: params
  })
}

export function loginOut (params) {
  return request({
    url: '/user/login-out',
    method: 'get',
    params: qs.stringify(params)
  })
}
