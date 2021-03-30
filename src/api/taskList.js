import request from './request'
import qs from 'Qs'


export function addList (listName) {
  return request({
    url: '/list/add',
    method: 'post',
    data: {
      name: listName
    }
  })
}


export function myList () {
  return request({
    url: '/list/my',
    method: 'get'
  })
}
