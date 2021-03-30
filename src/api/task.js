import request from './request'
import qs from 'Qs'

export function fetchTask (listName) {
  return request({
    url: '/task/list',
    method: 'get',
    data: {
      name: listName
    }
  })
}

export function getTask (taskId) {
  return request({
    url: '/task',
    method: 'get',
    params: {
      taskId: taskId
    }
  })
}

export function addTask (task) {
  return request({
    url: '/task/add',
    method: 'post',
    data: task
  })
}

export function editTask (task) {
  return request({
    url: '/task',
    method: 'put',
    data: task
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
