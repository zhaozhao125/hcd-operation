import branches from './branches/branches'
import order from './order/order'
import common from './common/common'
import chargingPile from './chargingPile'
import user from './user/user.js'
import funds from './funds'
import home from './home'
let api = {
  ...branches,
  ...order,
  ...common,
  ...chargingPile,
  ...user,
  ...funds,
  ...home
}

export default api
