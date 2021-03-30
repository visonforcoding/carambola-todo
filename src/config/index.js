module.exports = {

  title: 'learn-mall',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,
  baseUrl: {
    development: '', // 本地
    dev: 'http://127.0.0.1:5000', // fab pack:csc-dev
    stg: 'http://domain.cn', // fab pack:csc-stg
    gra: 'http://domain.cn', // fab pack:csc-gra
    prod: 'http://domain.cn/' // fab pack:csc-prod
  },
  serverPort: {
    py: '5000',
    java: '8080'
  },
  getBaseUrl() {
    // const API_URL = process.env.VUE_APP_API_URL || 'development'
    // let key = API_URL.replace(/^csc-(.*)/, '$1')
    let requestUrl = ''
    let prefix = 'http://'
    let host = location.hostname
    let port = location.port

    requestUrl = prefix + host + ":" + port
    return requestUrl
  },
  /**
   * 是否是本地环境
   */
  isDev: process.env.NODE_ENV === 'development'
}
