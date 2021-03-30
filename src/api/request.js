import axios from 'axios'
import config from 'src/config'
import Vue from 'vue'

// const development = config.isDev
// const baseURL = development ? `${config.getBaseUrl()}/api` : config.getBaseUrl()
let baseURL = config.getBaseUrl()
// create an axios instance
if (config.isDev) {
  baseURL = baseURL + '/dev'
} else {
  baseURL = baseURL + '/api'
}
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: baseURL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 120 // request timeout

})

service.interceptors.request.use(
  config => {
    if (config.method === 'POST') {
      config.headers = {
        'content-type': 'application/json'
      }
    }
    if (config.method === 'DELETE') {
      config.headers = {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }
    return config
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // 状态逻辑
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Vue.notify({
      group: 'common',
      title: '系统错误',
      text: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
