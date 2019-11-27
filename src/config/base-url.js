// optimus
// const BASE_URL = 'http://api.optimus.1byongche.com'
let BASE_URL = 'http://47.100.76.78:9090'
// let BASE_URL = 'https://backend.hechongdian.cn:1443'
// let BASE_URL = 'http://47.100.76.78:8510'
if (process.env.VUE_APP_ENV) {
  if (process.env.VUE_APP_ENV == 'dev') {
    BASE_URL = 'http://47.100.76.78:9090' // 测试地址
  } else if (process.env.VUE_APP_ENV == 'prod') {
    BASE_URL = 'https://backend.hechongdian.cn:1443' // 正式地址
  }
}
console.log('====process.env.VUE_APP_ENV====', process.env.VUE_APP_ENV)
// 七牛上传地址七牛上传地址
export const UP_URL = 'http://upload.qiniup.com/'
// 七牛下载地址
export const DOWN_URL = 'http://img1.hechongdian.cn/'
// BASE_URL = 'http://phpmroservice.net' // 正式地址
// export const servicePhp = '/' // php微服务
export const servicePhp = '/service-php/' // php微服务
// 充电桩
export const serviceCharging = '/service-charging/'

export default BASE_URL
