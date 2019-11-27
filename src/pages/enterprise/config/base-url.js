// manage
// let BASE_URL = 'http://47.104.149.175:8090'
let BASE_URL = 'https://test.backend.hechongdian.cn:8443'
if (process.env.VUE_APP_ENV) {
  if (process.env.VUE_APP_ENV == 'dev') {
    // BASE_URL = 'http://47.104.149.175:8090' // 测试地址
    BASE_URL = 'https://test.backend.hechongdian.cn:8443' // 测试地址
  } else if (process.env.VUE_APP_ENV == 'prod') {
    BASE_URL = 'https://backend.hechongdian.cn:1443' // 正式地址
  }
}

export default BASE_URL
