import request from './request'
import qs from 'Qs'

export function fetchTags () {
  return request({
    url: '/tag',
    method: 'get'
  })
}

export function getTag (taskId) {
  return request({
    url: '/tag',
    method: 'get',
    params: {
      taskId: taskId
    }
  })
}

export function addTag (tag) {
  return request({
    url: '/tag',
    method: 'post',
    data: tag
  })
}

export function deleteTask (taskId) {
  return request({
    url: '/task/delete',
    method: 'get',
    params: { taskId: taskId }
  })
}

export function updateList (taskId, listId) {
  return request({
    url: '/task',
    method: 'PATCH',
    data: qs.stringify({ taskId: taskId, listId: listId })
  })
}

export function deleteTag (tagId) {
  return request({
    url: '/tag',
    method: 'DELETE',
    params: { tagId: tagId }
  })
}
