/**
 * 根据坐标获取地理位置
 * @param  {Array} position 坐标数组
 * @param  {Object} config   返回值设置
 * @return {Promise}          根据config返回位置字符串或者详细信息Object
 */
export function getAddress (position, config) {
  let geocoder = new AMap.Geocoder({
    raduis: 1000,
    extensions: 'all'
  })
  return new Promise((resolve, reject) => {
    geocoder.getAddress(position, function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        if (result && result.regeocode) {
          if (config && config.fullData) {
            resolve(result.regeocode)
          } else {
            resolve(result.regeocode.formattedAddress)
          }
        } else {
          reject(result)
        }
      } else {
        reject(status, result)
      }
    })
  })
}
